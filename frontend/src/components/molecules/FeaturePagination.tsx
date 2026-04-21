import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'

interface IFeaturePaginationProps {
  currentPage: number
  onPageChange: (value: number) => void
  totalPages: number
}

export const FeaturePagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: IFeaturePaginationProps) => {
  const { t } = useTranslation('platform')

  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border/80 bg-card/70 p-4 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {t('features.pagination.page', {
          current: currentPage,
          total: totalPages,
        })}
      </p>
      <div className="flex gap-3">
        <Button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          type="button"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('features.pagination.previous')}
        </Button>
        <Button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
          variant="outline"
        >
          {t('features.pagination.next')}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
