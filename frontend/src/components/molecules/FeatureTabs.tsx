import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { useAuth } from '@/hooks/auth/useAuth'
import type { IFeatureListFilters } from '@/interfaces/features/IFeatureListFilters'

interface IFeatureTabsProps {
  onTabChange: (value: IFeatureListFilters['tab']) => void
  tab: IFeatureListFilters['tab']
}

export const FeatureTabs = ({ onTabChange, tab }: IFeatureTabsProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation('platform')
  const { isAuthenticated } = useAuth()

  const handleTabChange = (value: IFeatureListFilters['tab']) => {
    if (!isAuthenticated && value !== 'all') {
      navigate('/login')
      return
    }

    onTabChange(value)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => handleTabChange('all')}
        type="button"
        variant={tab === 'all' ? 'primary' : 'outline'}
      >
        {t('features.tabs.all')}
      </Button>
      <Button
        onClick={() => handleTabChange('mine')}
        type="button"
        variant={tab === 'mine' ? 'primary' : 'outline'}
      >
        {t('features.tabs.mine')}
      </Button>
      <Button
        onClick={() => handleTabChange('voted')}
        type="button"
        variant={tab === 'voted' ? 'primary' : 'outline'}
      >
        {t('features.tabs.voted')}
      </Button>
    </div>
  )
}
