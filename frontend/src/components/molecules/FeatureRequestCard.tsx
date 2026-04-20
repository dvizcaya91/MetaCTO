import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/atoms/Badge'
import type { IFeatureRequest } from '@/interfaces/feature-requests/IFeatureRequest'

interface IFeatureRequestCardProps {
  dataSource: 'api' | 'mock'
  rank: number
  request: IFeatureRequest
}

export const FeatureRequestCard = ({
  dataSource,
  rank,
  request,
}: IFeatureRequestCardProps) => {
  const { i18n, t } = useTranslation('platform')

  const createdAt = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: 'medium',
  }).format(new Date(request.createdAt))

  return (
    <article className="grid gap-5 rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.55)] backdrop-blur md:grid-cols-[auto_1fr_auto] md:items-start">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-lg font-extrabold text-foreground">
        {rank}
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary">
            {dataSource === 'mock'
              ? t('board.mockBadge')
              : t('board.apiBadge')}
          </Badge>
          <Badge variant="subtle">{request.category}</Badge>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {request.title}
          </h3>
          <p className="text-sm leading-7 text-muted-foreground">
            {request.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>{t('board.submittedBy', { name: request.submittedBy })}</span>
          <span>{t('board.createdAt', { value: createdAt })}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 md:flex-col md:items-end">
        <div className="rounded-2xl bg-secondary px-4 py-3 text-right">
          <div className="text-2xl font-extrabold text-foreground">
            {request.votesCount}
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t('board.votes', { count: request.votesCount })}
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t('board.rankSignal')}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </article>
  )
}
