import { AlertTriangle, ArrowUp, Plus, Sparkles, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/atoms/Badge'
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
  const { i18n, t } = useTranslation('platform')
  const {
    acceptSuggestion,
    clearSubmissionError,
    duplicateSuggestion,
    form,
    isAcceptingSuggestion,
    isForcingCreate,
    onSubmit,
    retryWithForce,
    submissionError,
  } =
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
  const isBusy = isSubmitting || isAcceptingSuggestion || isForcingCreate
  const suggestedFeature = duplicateSuggestion?.similar_feature

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat(i18n.language, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-4 py-6 backdrop-blur-md">
      <div
        aria-hidden="true"
        className="absolute inset-0 cursor-pointer"
        onClick={() => {
          if (!isBusy) {
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
            disabled={isBusy}
            onClick={onClose}
            size="sm"
            type="button"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form className="mt-6 space-y-6" onSubmit={onSubmit}>
          {duplicateSuggestion ? (
            <div className="space-y-4 rounded-[1.75rem] border border-amber-400/25 bg-amber-400/10 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-amber-200">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                    {t('features.create.duplicate.eyebrow')}
                  </p>
                  <h3 className="text-xl font-black tracking-tight text-foreground">
                    {t('features.create.duplicate.title')}
                  </h3>
                  <p className="text-sm leading-7 text-amber-50/85">
                    {duplicateSuggestion.detail}
                  </p>
                  <p className="text-sm leading-7 text-amber-50/70">
                    {t('features.create.duplicate.reasonLabel', {
                      reason: duplicateSuggestion.reason,
                    })}
                  </p>
                </div>
              </div>

              {suggestedFeature ? (
                <article className="rounded-[1.5rem] border border-border/80 bg-background/45 p-4 backdrop-blur-xl">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {t('features.create.duplicate.suggestedBadge')}
                      </Badge>
                      {suggestedFeature.is_owner ? (
                        <Badge variant="primary">
                          {t('features.cards.owned')}
                        </Badge>
                      ) : null}
                      {suggestedFeature.has_voted ? (
                        <Badge variant="secondary">
                          {t('features.cards.voted')}
                        </Badge>
                      ) : null}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      #{suggestedFeature.id}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-xl font-black tracking-tight text-foreground">
                      {suggestedFeature.title}
                    </h4>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {suggestedFeature.description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                      {t('features.cards.voteCount', {
                        count: suggestedFeature.number_of_votes,
                      })}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      {t('features.create.duplicate.createdAt', {
                        value: formatDate(suggestedFeature.created_at),
                      })}
                    </span>
                  </div>
                </article>
              ) : null}

              <div className="flex flex-wrap justify-end gap-3">
                <Button
                  disabled={isBusy || !duplicateSuggestion.can_force}
                  onClick={() => {
                    void retryWithForce()
                  }}
                  type="button"
                  variant="outline"
                >
                  {isForcingCreate
                    ? t('features.create.duplicate.forceSubmitting')
                    : t('features.create.duplicate.force')}
                </Button>
                <Button
                  disabled={isBusy}
                  onClick={() => {
                    void acceptSuggestion()
                  }}
                  type="button"
                >
                  {isAcceptingSuggestion
                    ? t('features.create.duplicate.acceptSubmitting')
                    : t('features.create.duplicate.accept')}
                </Button>
              </div>
            </div>
          ) : null}

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

          {submissionError && !duplicateSuggestion ? (
            <div className="rounded-[1.5rem] border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm text-destructive">
              {submissionError}
            </div>
          ) : null}

          <div className="flex flex-wrap justify-end gap-3">
            <Button
              disabled={isBusy}
              onClick={onClose}
              type="button"
              variant="outline"
            >
              {t('features.create.cancel')}
            </Button>
            <Button disabled={isBusy} type="submit">
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
