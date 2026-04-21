import { ArrowUp, Clock3, Plus, Sparkles, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Skeleton } from '@/components/atoms/Skeleton'
import { FeatureListControls } from '@/components/molecules/FeatureListControls'
import { FeaturePagination } from '@/components/molecules/FeaturePagination'
import { FeatureTabs } from '@/components/molecules/FeatureTabs'
import { useAuth } from '@/hooks/auth/useAuth'
import type { IFeature } from '@/interfaces/features/IFeature'
import type { IFeatureListFilters } from '@/interfaces/features/IFeatureListFilters'

interface IFeatureListProps {
  actionError: string | null
  activeVoteFeatureId: number | null
  currentPage: number
  errorMessage: string | null
  features: IFeature[]
  isLoading: boolean
  onCreateFeature: () => void
  onPageChange: (value: number) => void
  onSearchChange: (value: string) => void
  onSortChange: (value: IFeatureListFilters['sort']) => void
  onTabChange: (value: IFeatureListFilters['tab']) => void
  onToggleVote: (feature: IFeature) => void
  query: string
  refresh: () => void
  sort: IFeatureListFilters['sort']
  tab: IFeatureListFilters['tab']
  totalCount: number
  totalPages: number
}

const LoadingGrid = () => (
  <div className="grid gap-4 xl:grid-cols-2">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        className="space-y-4 rounded-[1.75rem] border border-border/80 bg-card/70 p-5 backdrop-blur-2xl"
        key={index}
      >
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-24 w-full rounded-[1.25rem]" />
        <div className="flex gap-3">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-32 rounded-full" />
        </div>
      </div>
    ))}
  </div>
)

export const FeatureList = ({
  actionError,
  activeVoteFeatureId,
  currentPage,
  errorMessage,
  features,
  isLoading,
  onCreateFeature,
  onPageChange,
  onSearchChange,
  onSortChange,
  onTabChange,
  onToggleVote,
  query,
  refresh,
  sort,
  tab,
  totalCount,
  totalPages,
}: IFeatureListProps) => {
  const { t, i18n } = useTranslation('platform')
  const { isAuthenticated } = useAuth()

  const formatDate = (value: string | null) => {
    if (!value) {
      return t('features.cards.neverVoted')
    }

    return new Intl.DateTimeFormat(i18n.language, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  }

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge variant="primary">{t('features.eyebrow')}</Badge>
            <h2 className="text-4xl font-black tracking-[-0.04em] text-foreground">
              {t('features.title')}
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              {t('features.description')}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border/80 bg-card/70 px-5 py-4 backdrop-blur-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t('features.totalLabel')}
            </p>
            <p className="mt-2 text-2xl font-black text-foreground">{totalCount}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <FeatureTabs onTabChange={onTabChange} tab={tab} />
          <Button onClick={onCreateFeature} type="button">
            <Plus className="h-4 w-4" />
            {t('features.create.open')}
          </Button>
        </div>
        <FeatureListControls
          onSearchChange={onSearchChange}
          onSortChange={onSortChange}
          query={query}
          sort={sort}
        />
      </div>

      {actionError ? (
        <div className="rounded-[1.5rem] border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm text-destructive">
          {actionError}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-[1.75rem] border border-destructive/20 bg-destructive/8 p-6">
          <h3 className="text-lg font-bold text-foreground">
            {t('features.errors.title')}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {errorMessage}
          </p>
          <Button className="mt-4" onClick={() => void refresh()} type="button" variant="outline">
            {t('features.controls.refresh')}
          </Button>
        </div>
      ) : null}

      {isLoading ? <LoadingGrid /> : null}

      {!isLoading && !errorMessage && features.length === 0 ? (
        <div className="rounded-[1.75rem] border border-border/80 bg-card/70 p-8 text-center backdrop-blur-2xl">
          <h3 className="text-2xl font-black tracking-tight text-foreground">
            {t('features.empty.title')}
          </h3>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            {t('features.empty.description')}
          </p>
        </div>
      ) : null}

      {!isLoading && !errorMessage && features.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {features.map((feature) => (
            <article
              className={[
                'rounded-[1.75rem] border p-5 backdrop-blur-2xl transition-colors',
                feature.is_owner
                  ? 'border-emerald-400/35 bg-emerald-400/8 shadow-[0_24px_90px_-52px_rgba(52,211,153,0.55)]'
                  : feature.has_voted
                    ? 'border-primary/35 bg-primary/8 shadow-[0_24px_90px_-52px_rgba(0,117,255,0.55)]'
                    : 'border-border/80 bg-card/70',
              ].join(' ')}
              key={feature.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {feature.is_owner ? (
                    <Badge variant="primary">{t('features.cards.owned')}</Badge>
                  ) : null}
                  {feature.has_voted ? (
                    <Badge variant="secondary">{t('features.cards.voted')}</Badge>
                  ) : null}
                </div>
                <Button
                  disabled={activeVoteFeatureId === feature.id || feature.is_owner}
                  onClick={() => onToggleVote(feature)}
                  type="button"
                  variant={feature.has_voted ? 'primary' : 'outline'}
                >
                  <ArrowUp className="h-4 w-4" />
                  {feature.is_owner
                    ? t('features.cards.ownerVoteLocked')
                    : feature.has_voted
                      ? activeVoteFeatureId === feature.id
                        ? t('features.cards.unvoting')
                        : t('features.cards.unvote')
                      : activeVoteFeatureId === feature.id
                        ? t('features.cards.voting')
                        : isAuthenticated
                          ? t('features.cards.vote')
                          : t('features.cards.loginToVote')}
                </Button>
              </div>

              <div className="mt-5 space-y-3">
                <h3 className="text-2xl font-black tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {t('features.cards.createdAt', {
                    value: formatDate(feature.created_at),
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {t('features.cards.lastVotedAt', {
                    value: formatDate(feature.last_voted_at),
                  })}
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-[1.25rem] border border-border/70 bg-background/45 px-4 py-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  {t('features.cards.voteCount', {
                    count: feature.number_of_votes,
                  })}
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  #{feature.id}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {!isLoading && !errorMessage && features.length > 0 ? (
        <FeaturePagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      ) : null}
    </section>
  )
}
