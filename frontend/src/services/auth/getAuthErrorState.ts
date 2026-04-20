import axios from 'axios'

import type { IAuthErrorState } from '@/interfaces/auth/IAuthErrorState'
import type { IErrorDetailResponse } from '@/interfaces/auth/IErrorDetailResponse'
import type { IValidationErrorResponse } from '@/interfaces/auth/IValidationErrorResponse'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isErrorDetailResponse = (value: unknown): value is IErrorDetailResponse =>
  isRecord(value) && typeof value.detail === 'string'

const isValidationErrorResponse = (
  value: unknown,
): value is IValidationErrorResponse => {
  if (!isRecord(value) || 'detail' in value) {
    return false
  }

  return Object.values(value).every(
    (messages) =>
      Array.isArray(messages) &&
      messages.every((message) => typeof message === 'string'),
  )
}

export const getAuthErrorState = (error: unknown): IAuthErrorState => {
  if (!axios.isAxiosError(error)) {
    return {
      detail: null,
      fieldErrors: {},
      hasNetworkError: false,
      statusCode: null,
    }
  }

  if (!error.response) {
    return {
      detail: null,
      fieldErrors: {},
      hasNetworkError: true,
      statusCode: null,
    }
  }

  const { data, status } = error.response

  if (isValidationErrorResponse(data)) {
    const fieldErrors = Object.fromEntries(
      Object.entries(data).map(([fieldName, messages]) => [
        fieldName,
        messages[0] ?? '',
      ]),
    )

    return {
      detail: null,
      fieldErrors,
      hasNetworkError: false,
      statusCode: status,
    }
  }

  if (isErrorDetailResponse(data)) {
    return {
      detail: data.detail,
      fieldErrors: {},
      hasNetworkError: false,
      statusCode: status,
    }
  }

  return {
    detail: null,
    fieldErrors: {},
    hasNetworkError: false,
    statusCode: status,
  }
}
