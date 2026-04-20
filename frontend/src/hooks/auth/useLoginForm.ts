import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import type { ILoginFormValues } from '@/interfaces/auth/ILoginFormValues'
import { useAuth } from '@/hooks/auth/useAuth'
import { applyFieldErrorsToForm } from '@/lib/reactHookForm'
import { getAuthErrorState } from '@/services/auth/getAuthErrorState'

export const useLoginForm = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('platform')
  const { signIn } = useAuth()
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const form = useForm<ILoginFormValues>({
    defaultValues: {
      password: '',
      username: '',
    },
    mode: 'onBlur',
  })

  const clearSubmissionError = () => {
    setSubmissionError(null)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    clearSubmissionError()

    try {
      await signIn(values)
      form.reset()
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const errorState = getAuthErrorState(error)

      applyFieldErrorsToForm<ILoginFormValues>(
        ['username', 'password'],
        errorState.fieldErrors,
        form.setError,
      )

      if (errorState.detail) {
        setSubmissionError(errorState.detail)
        return
      }

      if (errorState.hasNetworkError) {
        setSubmissionError(t('auth.errors.network'))
        return
      }

      if (errorState.statusCode === 400) {
        setSubmissionError(t('auth.errors.validation'))
        return
      }

      if (errorState.statusCode === 401) {
        setSubmissionError(t('auth.errors.invalidCredentials'))
        return
      }

      setSubmissionError(t('auth.errors.unexpected'))
    }
  })

  return {
    clearSubmissionError,
    form,
    onSubmit,
    submissionError,
  }
}
