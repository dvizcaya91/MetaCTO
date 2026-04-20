import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { FeatureStatCard } from '@/components/molecules/FeatureStatCard'
import { FeatureBoard } from '@/components/organisms/FeatureBoard'
import { useFeatureRequests } from '@/hooks/feature-requests/useFeatureRequests'

export const FeatureRequestsPage = () => {
  const { t } = useTranslation('platform')
  const {
    dataSource,
    errorMessage,
    filteredCount,
    isLoading,
    isRefreshing,
    refresh,
    requests,
    searchQuery,
    setSearchQuery,
    setSortMode,
    sortMode,
    totalCount,
  } = useFeatureRequests()

  const totalVotes = requests.reduce(
    (accumulator, request) => accumulator + request.votesCount,
    0,
  )

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:items-end">
        <div className="space-y-6">
          <Badge variant="primary">{t('hero.eyebrow')}</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-black leading-none tracking-[-0.05em] text-foreground md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {t('hero.description')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="#feature-board">{t('hero.primaryAction')}</a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/submit">{t('hero.secondaryAction')}</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <FeatureStatCard
            label={t('stats.requests')}
            value={String(totalCount)}
          />
          <FeatureStatCard
            label={t('stats.votes')}
            value={String(totalVotes)}
          />
          <FeatureStatCard
            label={t('stats.topIdea')}
            value={requests[0]?.title ?? t('stats.none')}
          />
        </div>
      </section>

      <FeatureBoard
        dataSource={dataSource}
        errorMessage={errorMessage}
        filteredCount={filteredCount}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onRefresh={() => {
          void refresh()
        }}
        onSearchChange={setSearchQuery}
        onSortChange={setSortMode}
        requests={requests}
        searchQuery={searchQuery}
        sortMode={sortMode}
      />
    </div>
  )
}
