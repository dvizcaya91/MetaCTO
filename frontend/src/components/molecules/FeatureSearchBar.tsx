import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import type { IFeatureRequestFilters } from '@/interfaces/feature-requests/IFeatureRequestFilters'

interface IFeatureSearchBarProps {
  onSearchChange: (value: string) => void
  onSortChange: (value: IFeatureRequestFilters['sortMode']) => void
  searchQuery: string
  sortMode: IFeatureRequestFilters['sortMode']
}

export const FeatureSearchBar = ({
  onSearchChange,
  onSortChange,
  searchQuery,
  sortMode,
}: IFeatureSearchBarProps) => {
  const { t } = useTranslation('platform')

  return (
    <div className="grid gap-4 rounded-[2rem] border border-border/70 bg-card/85 p-5 backdrop-blur lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground" htmlFor="feature-search">
          {t('board.searchLabel')}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="feature-search"
            className="pl-11"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t('board.searchPlaceholder')}
            value={searchQuery}
          />
        </div>
      </div>
      <div className="space-y-3">
        <span className="block text-sm font-semibold text-foreground">
          {t('board.sortLabel')}
        </span>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => onSortChange('most-voted')}
            type="button"
            variant={sortMode === 'most-voted' ? 'primary' : 'outline'}
          >
            {t('board.sortVotes')}
          </Button>
          <Button
            onClick={() => onSortChange('newest')}
            type="button"
            variant={sortMode === 'newest' ? 'primary' : 'outline'}
          >
            {t('board.sortNewest')}
          </Button>
        </div>
      </div>
    </div>
  )
}
