import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { Textarea } from '@/components/atoms/Textarea'
import { useFeatureRequestForm } from '@/hooks/feature-requests/useFeatureRequestForm'

export const FeatureRequestForm = () => {
  const { t } = useTranslation('platform')
  const {
    clearSubmissionState,
    form,
    hasSubmitted,
    onSubmit,
  } = useFeatureRequestForm()

  const {
    formState: { errors, isSubmitting },
    register,
  } = form

  return (
    <form
      className="space-y-6 rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-[0_32px_80px_-48px_rgba(15,23,42,0.5)]"
      onSubmit={onSubmit}
    >
      <div className="space-y-2">
        <Label htmlFor="feature-title">{t('form.titleLabel')}</Label>
        <Input
          id="feature-title"
          placeholder={t('form.titlePlaceholder')}
          {...register('title', {
            minLength: {
              message: t('form.errors.titleMin'),
              value: 5,
            },
            onChange: clearSubmissionState,
            required: t('form.errors.titleRequired'),
          })}
        />
        {errors.title ? (
          <p className="text-sm font-medium text-destructive">
            {errors.title.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="feature-description">{t('form.descriptionLabel')}</Label>
        <Textarea
          id="feature-description"
          placeholder={t('form.descriptionPlaceholder')}
          {...register('description', {
            minLength: {
              message: t('form.errors.descriptionMin'),
              value: 20,
            },
            onChange: clearSubmissionState,
            required: t('form.errors.descriptionRequired'),
          })}
        />
        {errors.description ? (
          <p className="text-sm font-medium text-destructive">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 rounded-[1.5rem] bg-secondary/70 p-5">
        <p className="text-sm leading-7 text-muted-foreground">
          {t('form.helper')}
        </p>
        {hasSubmitted ? (
          <p className="text-sm font-semibold text-primary">
            {t('form.success')}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Button disabled={isSubmitting} type="submit">
            {t('form.submit')}
          </Button>
          <Button
            onClick={() => {
              form.reset()
              clearSubmissionState()
            }}
            type="button"
            variant="outline"
          >
            {t('form.clear')}
          </Button>
        </div>
      </div>
    </form>
  )
}
