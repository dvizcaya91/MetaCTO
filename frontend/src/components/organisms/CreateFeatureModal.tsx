import { Plus, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { Textarea } from '@/components/atoms/Textarea'
import { useCreateFeatureForm } from '@/hooks/features/useCreateFeatureForm'

interface ICreateFeatureModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => Promise<void> | void
}

export const CreateFeatureModal = ({
  isOpen,
  onClose,
  onCreated,
}: ICreateFeatureModalProps) => {
  const { t } = useTranslation('platform')
  const { clearSubmissionError, form, onSubmit, submissionError } =
    useCreateFeatureForm({
      onSuccess: async () => {
        await onCreated()
        onClose()
      },
    })

  const {
    formState: { errors, isSubmitting },
    register,
  } = form

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-4 py-6 backdrop-blur-md">
      <div
        aria-hidden="true"
        className="absolute inset-0 cursor-pointer"
        onClick={() => {
          if (!isSubmitting) {
            onClose()
          }
        }}
      />
      <div
        aria-modal="true"
        className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-border/80 bg-card/85 p-6 shadow-[0_48px_140px_-60px_rgba(0,117,255,0.55)] backdrop-blur-2xl"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <Plus className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              {t('features.create.title')}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              {t('features.create.description')}
            </p>
          </div>
          <Button
            aria-label={t('features.create.close')}
            disabled={isSubmitting}
            onClick={onClose}
            size="sm"
            type="button"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form className="mt-6 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="create-feature-title">
              {t('features.create.titleLabel')}
            </Label>
            <Input
              id="create-feature-title"
              placeholder={t('features.create.titlePlaceholder')}
              {...register('title', {
                minLength: {
                  message: t('features.create.validation.titleMin'),
                  value: 3,
                },
                onChange: clearSubmissionError,
                required: t('features.create.validation.titleRequired'),
              })}
            />
            {errors.title ? (
              <p className="text-sm font-medium text-destructive">
                {errors.title.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-feature-description">
              {t('features.create.descriptionLabel')}
            </Label>
            <Textarea
              id="create-feature-description"
              placeholder={t('features.create.descriptionPlaceholder')}
              {...register('description', {
                minLength: {
                  message: t('features.create.validation.descriptionMin'),
                  value: 10,
                },
                onChange: clearSubmissionError,
                required: t('features.create.validation.descriptionRequired'),
              })}
            />
            {errors.description ? (
              <p className="text-sm font-medium text-destructive">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          {submissionError ? (
            <div className="rounded-[1.5rem] border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm text-destructive">
              {submissionError}
            </div>
          ) : null}

          <div className="flex flex-wrap justify-end gap-3">
            <Button
              disabled={isSubmitting}
              onClick={onClose}
              type="button"
              variant="outline"
            >
              {t('features.create.cancel')}
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting
                ? t('features.create.submitting')
                : t('features.create.submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
