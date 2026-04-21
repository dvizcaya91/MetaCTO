import { ArrowDownWideNarrow, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import type { IFeatureListFilters } from '@/interfaces/features/IFeatureListFilters'

interface IFeatureListControlsProps {
  onSearchChange: (value: string) => void
  onSortChange: (value: IFeatureListFilters['sort']) => void
  query: string
  sort: IFeatureListFilters['sort']
}

export const FeatureListControls = ({
  onSearchChange,
  onSortChange,
  query,
  sort,
}: IFeatureListControlsProps) => {
  const { t } = useTranslation('platform')

  return (
    <div className="grid gap-4 rounded-[1.75rem] border border-border/80 bg-card/70 p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground" htmlFor="feature-query">
          {t('features.controls.searchLabel')}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-11"
            id="feature-query"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t('features.controls.searchPlaceholder')}
            value={query}
          />
        </div>
      </div>
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          <ArrowDownWideNarrow className="h-4 w-4 text-primary" />
          {t('features.controls.sortLabel')}
        </span>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => onSortChange('number_of_votes')}
            type="button"
            variant={sort === 'number_of_votes' ? 'primary' : 'outline'}
          >
            {t('features.sort.mostVotes')}
          </Button>
          <Button
            onClick={() => onSortChange('created_at')}
            type="button"
            variant={sort === 'created_at' ? 'primary' : 'outline'}
          >
            {t('features.sort.lastCreated')}
          </Button>
          <Button
            onClick={() => onSortChange('last_voted_at')}
            type="button"
            variant={sort === 'last_voted_at' ? 'primary' : 'outline'}
          >
            {t('features.sort.lastVoted')}
          </Button>
        </div>
      </div>
    </div>
  )
}
