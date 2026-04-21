import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import type { ICreateFeatureFormValues } from '@/interfaces/features/ICreateFeatureFormValues'
import type { ISemanticDuplicateFeatureResponse } from '@/interfaces/features/ISemanticDuplicateFeatureResponse'
import { applyFieldErrorsToForm } from '@/lib/reactHookForm'
import { createFeature } from '@/services/features/createFeature'
import { getCreateFeatureErrorState } from '@/services/features/getCreateFeatureErrorState'
import { voteForFeature } from '@/services/features/voteForFeature'

interface IUseCreateFeatureFormOptions {
  onSuccess: () => Promise<void> | void
}

export const useCreateFeatureForm = ({
  onSuccess,
}: IUseCreateFeatureFormOptions) => {
  const { t } = useTranslation('platform')
  const [duplicateSuggestion, setDuplicateSuggestion] =
    useState<ISemanticDuplicateFeatureResponse | null>(null)
  const [isAcceptingSuggestion, setIsAcceptingSuggestion] = useState(false)
  const [isForcingCreate, setIsForcingCreate] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const form = useForm<ICreateFeatureFormValues>({
    defaultValues: {
      description: '',
      title: '',
    },
    mode: 'onBlur',
  })

  const clearSubmissionError = () => {
    setSubmissionError(null)
    setDuplicateSuggestion(null)
  }

  const submitFeature = async (
    values: ICreateFeatureFormValues,
    options?: {
      force?: boolean
    },
  ) => {
    clearSubmissionError()

    try {
      await createFeature({
        ...values,
        force: options?.force,
      })

      form.reset()
      setDuplicateSuggestion(null)
      await onSuccess()
    } catch (error) {
      const errorState = getCreateFeatureErrorState(error)

      applyFieldErrorsToForm<ICreateFeatureFormValues>(
        ['title', 'description'],
        errorState.fieldErrors,
        form.setError,
      )

      if (errorState.duplicateSuggestion) {
        setDuplicateSuggestion(errorState.duplicateSuggestion)
        setSubmissionError(null)
        return
      }

      if (errorState.detail) {
        setSubmissionError(errorState.detail)
        return
      }

      if (errorState.hasNetworkError) {
        setSubmissionError(t('features.create.errors.network'))
        return
      }

      if (errorState.statusCode === 400) {
        setSubmissionError(t('features.create.errors.validation'))
        return
      }

      if (errorState.statusCode === 401) {
        setSubmissionError(t('features.create.errors.unauthorized'))
        return
      }

      setSubmissionError(t('features.create.errors.unexpected'))
    }
  }

  const onSubmit = form.handleSubmit(async (values) => {
    await submitFeature(values)
  })

  const acceptSuggestion = async () => {
    if (!duplicateSuggestion) {
      return
    }

    setSubmissionError(null)
    setIsAcceptingSuggestion(true)

    try {
      if (
        !duplicateSuggestion.similar_feature.has_voted &&
        !duplicateSuggestion.similar_feature.is_owner
      ) {
        await voteForFeature(duplicateSuggestion.similar_feature.id)
      }

      form.reset()
      setDuplicateSuggestion(null)
      await onSuccess()
    } catch (error) {
      const errorState = getCreateFeatureErrorState(error)

      if (errorState.detail) {
        setSubmissionError(errorState.detail)
        return
      }

      if (errorState.hasNetworkError) {
        setSubmissionError(t('features.create.errors.network'))
        return
      }

      if (errorState.statusCode === 401) {
        setSubmissionError(t('features.create.errors.unauthorized'))
        return
      }

      setSubmissionError(t('features.create.duplicate.acceptError'))
    } finally {
      setIsAcceptingSuggestion(false)
    }
  }

  const retryWithForce = async () => {
    const isValid = await form.trigger()

    if (!isValid) {
      return
    }

    setIsForcingCreate(true)

    try {
      await submitFeature(form.getValues(), {
        force: true,
      })
    } finally {
      setIsForcingCreate(false)
    }
  }

  return {
    acceptSuggestion,
    clearSubmissionError,
    duplicateSuggestion,
    form,
    isAcceptingSuggestion,
    isForcingCreate,
    onSubmit,
    retryWithForce,
    submissionError,
  }
}
