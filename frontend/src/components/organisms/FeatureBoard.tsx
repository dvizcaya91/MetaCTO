import { RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { Skeleton } from '@/components/atoms/Skeleton'
import { FeatureRequestCard } from '@/components/molecules/FeatureRequestCard'
import { FeatureSearchBar } from '@/components/molecules/FeatureSearchBar'
import type { IFeatureRequest } from '@/interfaces/feature-requests/IFeatureRequest'
import type { IFeatureRequestFilters } from '@/interfaces/feature-requests/IFeatureRequestFilters'

interface IFeatureBoardProps {
  dataSource: 'api' | 'mock'
  errorMessage: string | null
  filteredCount: number
  isLoading: boolean
  isRefreshing: boolean
  onRefresh: () => void
  onSearchChange: (value: string) => void
  onSortChange: (value: IFeatureRequestFilters['sortMode']) => void
  requests: IFeatureRequest[]
  searchQuery: string
  sortMode: IFeatureRequestFilters['sortMode']
}

const LoadingCards = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        className="grid gap-5 rounded-[2rem] border border-border/70 bg-card/70 p-6 md:grid-cols-[auto_1fr_auto]"
        key={index}
      >
        <Skeleton className="h-14 w-14 rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-20 w-24 rounded-2xl" />
      </div>
    ))}
  </div>
)

export const FeatureBoard = ({
  dataSource,
  errorMessage,
  filteredCount,
  isLoading,
  isRefreshing,
  onRefresh,
  onSearchChange,
  onSortChange,
  requests,
  searchQuery,
  sortMode,
}: IFeatureBoardProps) => {
  const { t } = useTranslation('platform')

  return (
    <section className="space-y-6" id="feature-board">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {t('board.sectionEyebrow')}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            {t('board.sectionTitle')}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {t('board.sectionDescription')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            {t('board.resultsCount', { count: filteredCount })}
          </span>
          {isRefreshing ? (
            <span className="text-sm font-medium text-muted-foreground">
              {t('board.refreshing')}
            </span>
          ) : null}
        </div>
      </div>

      <FeatureSearchBar
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        searchQuery={searchQuery}
        sortMode={sortMode}
      />

      {isLoading ? <LoadingCards /> : null}

      {!isLoading && errorMessage ? (
        <div className="rounded-[2rem] border border-destructive/20 bg-destructive/5 p-6">
          <h3 className="text-lg font-bold text-foreground">
            {t('board.errorTitle')}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            {t('board.errorDescription')}
          </p>
          <p className="mt-4 text-sm font-medium text-destructive">
            {errorMessage}
          </p>
          <Button className="mt-5" onClick={onRefresh} type="button" variant="outline">
            <RefreshCw className="h-4 w-4" />
            {t('board.refresh')}
          </Button>
        </div>
      ) : null}

      {!isLoading && !errorMessage && requests.length === 0 ? (
        <div className="rounded-[2rem] border border-border/70 bg-card/75 p-8 text-center">
          <h3 className="text-lg font-bold text-foreground">
            {t('board.emptyTitle')}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t('board.emptyDescription')}
          </p>
        </div>
      ) : null}

      {!isLoading && !errorMessage && requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request, index) => (
            <FeatureRequestCard
              dataSource={dataSource}
              key={request.id}
              rank={index + 1}
              request={request}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
