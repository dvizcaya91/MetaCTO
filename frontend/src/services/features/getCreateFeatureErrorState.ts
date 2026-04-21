import axios from 'axios'

import type { ICreateFeatureErrorState } from '@/interfaces/features/ICreateFeatureErrorState'
import type { ISemanticDuplicateFeatureResponse } from '@/interfaces/features/ISemanticDuplicateFeatureResponse'
import { getAuthErrorState } from '@/services/auth/getAuthErrorState'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isSemanticDuplicateFeatureResponse = (
  value: unknown,
): value is ISemanticDuplicateFeatureResponse =>
  isRecord(value) &&
  value.code === 'semantic_duplicate' &&
  typeof value.detail === 'string' &&
  typeof value.reason === 'string' &&
  typeof value.confidence === 'number' &&
  typeof value.similarity === 'number' &&
  typeof value.can_force === 'boolean' &&
  isRecord(value.similar_feature)

export const getCreateFeatureErrorState = (
  error: unknown,
): ICreateFeatureErrorState => {
  if (
    axios.isAxiosError(error) &&
    error.response &&
    isSemanticDuplicateFeatureResponse(error.response.data)
  ) {
    return {
      detail: error.response.data.detail,
      duplicateSuggestion: error.response.data,
      fieldErrors: {},
      hasNetworkError: false,
      statusCode: error.response.status,
    }
  }

  return {
    ...getAuthErrorState(error),
    duplicateSuggestion: null,
  }
}
