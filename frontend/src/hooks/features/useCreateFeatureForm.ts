import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import type { ICreateFeatureFormValues } from '@/interfaces/features/ICreateFeatureFormValues'
import { applyFieldErrorsToForm } from '@/lib/reactHookForm'
import { getAuthErrorState } from '@/services/auth/getAuthErrorState'
import { createFeature } from '@/services/features/createFeature'

interface IUseCreateFeatureFormOptions {
  onSuccess: () => Promise<void> | void
}

export const useCreateFeatureForm = ({
  onSuccess,
}: IUseCreateFeatureFormOptions) => {
  const { t } = useTranslation('platform')
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
  }

  const onSubmit = form.handleSubmit(async (values) => {
    clearSubmissionError()

    try {
      await createFeature(values)
      form.reset()
      await onSuccess()
    } catch (error) {
      const errorState = getAuthErrorState(error)

      applyFieldErrorsToForm<ICreateFeatureFormValues>(
        ['title', 'description'],
        errorState.fieldErrors,
        form.setError,
      )

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
  })

  return {
    clearSubmissionError,
    form,
    onSubmit,
    submissionError,
  }
}
