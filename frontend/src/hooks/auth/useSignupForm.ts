import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import type { ISignupFormValues } from '@/interfaces/auth/ISignupFormValues'
import { useAuth } from '@/hooks/auth/useAuth'
import { applyFieldErrorsToForm } from '@/lib/reactHookForm'
import { getAuthErrorState } from '@/services/auth/getAuthErrorState'

export const useSignupForm = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('platform')
  const { signUp } = useAuth()
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const form = useForm<ISignupFormValues>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
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
      await signUp({
        password: values.password,
        username: values.username,
      })
      form.reset()
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const errorState = getAuthErrorState(error)

      applyFieldErrorsToForm<ISignupFormValues>(
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
