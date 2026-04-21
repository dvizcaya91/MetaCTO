"""Voting domain rules and exceptions."""


class VotingDomainError(Exception):
    """Base exception for voting domain rule violations."""


class SelfVoteNotAllowedError(VotingDomainError):
    """Raised when a feature owner tries to vote on their own feature."""


class DuplicateVoteError(VotingDomainError):
    """Raised when a user tries to vote more than once on the same feature."""


class VoteNotFoundError(VotingDomainError):
    """Raised when a user tries to remove a vote that does not exist."""


def ensure_user_can_vote_for_feature(*, feature, user):
    """Reject votes on a user's own feature."""
    if feature.owner_id == user.id:
        raise SelfVoteNotAllowedError(
            "Feature owners cannot vote for their own feature."
        )
