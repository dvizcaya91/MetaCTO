import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { IFeatureRequestFormValues } from '@/interfaces/feature-requests/IFeatureRequestForm'

export const useFeatureRequestForm = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const form = useForm<IFeatureRequestFormValues>({
    defaultValues: {
      description: '',
      title: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = form.handleSubmit(() => {
    setHasSubmitted(true)
  })

  return {
    clearSubmissionState: () => setHasSubmitted(false),
    form,
    hasSubmitted,
    onSubmit,
  }
}
