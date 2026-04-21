"""Semantic duplicate detection for feature creation."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Sequence

from django.conf import settings
from pgvector.django import CosineDistance
from pydantic import BaseModel, Field

from llama_index.core.prompts import PromptTemplate
from llama_index.llms.openai import OpenAI as LlamaOpenAI
from openai import OpenAI

from apps.voting.models import FeatureEmbedding


def build_feature_canonical_text(*, title: str, description: str) -> str:
    """Build the canonical text that is embedded and compared semantically."""
    return "Title: {title}\nDescription: {description}".format(
        title=title.strip(),
        description=description.strip(),
    )


class SemanticValidationUnavailableError(Exception):
    """Raised when semantic validation cannot be completed safely."""


class SemanticDuplicateFeatureError(Exception):
    """Raised when a create request is classified as a duplicate."""

    def __init__(
        self,
        *,
        confidence: float,
        feature_id: int,
        reason: str,
        similarity: float,
    ) -> None:
        super().__init__(reason)
        self.confidence = confidence
        self.feature_id = feature_id
        self.reason = reason
        self.similarity = similarity


@dataclass(frozen=True)
class SemanticCandidate:
    """Nearest semantic candidate selected from vector search."""

    canonical_text: str
    feature_id: int
    similarity: float


@dataclass(frozen=True)
class SemanticDuplicateMatch:
    """Final duplicate match result after vector search and LLM adjudication."""

    confidence: float
    feature_id: int
    reason: str
    similarity: float


class DuplicateAssessment(BaseModel):
    """Structured LLM output for duplicate adjudication."""

    is_duplicate: bool = Field(description="Whether the two feature requests are the same.")
    confidence: float = Field(
        ge=0.0,
        le=1.0,
        description="Confidence score between 0 and 1.",
    )
    reason: str = Field(min_length=1, description="Short explanation for the decision.")


class SemanticFeatureValidator:
    """Generate embeddings, retrieve candidates, and classify duplicates."""

    def __init__(self) -> None:
        self._embedding_client: OpenAI | None = None
        self._llm: LlamaOpenAI | None = None

    @property
    def embedding_client(self) -> OpenAI:
        if self._embedding_client is None:
            if not settings.OPENAI_API_KEY:
                raise SemanticValidationUnavailableError("OPENAI_API_KEY is not configured.")

            self._embedding_client = OpenAI(api_key=settings.OPENAI_API_KEY)

        return self._embedding_client

    @property
    def llm(self) -> LlamaOpenAI:
        if self._llm is None:
            if not settings.OPENAI_API_KEY:
                raise SemanticValidationUnavailableError("OPENAI_API_KEY is not configured.")

            self._llm = LlamaOpenAI(
                api_key=settings.OPENAI_API_KEY,
                model=settings.OPENAI_DUPLICATE_CHECK_MODEL,
                temperature=0,
            )

        return self._llm

    def generate_embedding(self, canonical_text: str) -> list[float]:
        """Generate an embedding for a canonical feature representation."""
        try:
            response = self.embedding_client.embeddings.create(
                input=canonical_text,
                model=settings.OPENAI_EMBEDDING_MODEL,
            )
        except Exception as exc:  # noqa: BLE001
            raise SemanticValidationUnavailableError(
                "Could not generate a feature embedding."
            ) from exc

        embedding = list(response.data[0].embedding)

        if len(embedding) != settings.FEATURE_EMBEDDING_DIMENSIONS:
            raise SemanticValidationUnavailableError(
                "Embedding dimensions do not match the configured vector field."
            )

        return embedding

    def find_duplicate_match(
        self,
        *,
        canonical_text: str,
        embedding: Sequence[float],
    ) -> SemanticDuplicateMatch | None:
        """Return a duplicate match when the nearest candidate clears all checks."""
        candidate = self._find_candidate(embedding)
        if candidate is None:
            return None

        assessment = self._classify_pair(
            proposed_feature=canonical_text,
            existing_feature=candidate.canonical_text,
        )

        print("assessment", assessment)
        if not assessment.is_duplicate:
            return None

        return SemanticDuplicateMatch(
            confidence=assessment.confidence,
            feature_id=candidate.feature_id,
            reason=assessment.reason.strip(),
            similarity=candidate.similarity,
        )

    def _find_candidate(self, embedding: Sequence[float]) -> SemanticCandidate | None:
        candidate = (
            FeatureEmbedding.objects.annotate(
                distance=CosineDistance("embedding", embedding),
            )
            .order_by("distance", "feature_id")
            .values("canonical_text", "distance", "feature_id")
            .first()
        )

        print("candidate", candidate)
        if candidate is None:
            return None

        similarity = max(0.0, 1.0 - float(candidate["distance"]))

        print("similarity", similarity)
        if similarity < settings.FEATURE_SEMANTIC_SIMILARITY_THRESHOLD:
            return None

        return SemanticCandidate(
            canonical_text=candidate["canonical_text"],
            feature_id=candidate["feature_id"],
            similarity=similarity,
        )

    def _classify_pair(
        self,
        *,
        proposed_feature: str,
        existing_feature: str,
    ) -> DuplicateAssessment:
        prompt = PromptTemplate(
            """
You are validating whether two feature requests describe the same product capability.

Mark them as duplicates only when a user who wants one feature would reasonably expect the other feature to satisfy the same need without material product differences.

Consider overlap in intent, scope, and outcome. Differences in wording, examples, or minor implementation details do not make them different features.

Return:
- is_duplicate: true or false
- confidence: number from 0 to 1
- reason: one concise sentence for a product user

Proposed feature:
{proposed_feature}

Existing feature:
{existing_feature}
            """.strip()
        )

        try:
            return self.llm.structured_predict(
                DuplicateAssessment,
                prompt,
                proposed_feature=proposed_feature,
                existing_feature=existing_feature,
            )
        except Exception as exc:  # noqa: BLE001
            raise SemanticValidationUnavailableError(
                "Could not complete semantic duplicate validation."
            ) from exc


semantic_feature_validator = SemanticFeatureValidator()
