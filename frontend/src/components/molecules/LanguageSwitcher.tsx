import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('platform')

  return (
    <div className="flex items-center gap-1 rounded-full border border-border/70 bg-card/90 p-1">
      <Button
        onClick={() => void i18n.changeLanguage('en')}
        size="sm"
        type="button"
        variant={i18n.language === 'en' ? 'primary' : 'ghost'}
      >
        {t('language.english')}
      </Button>
      <Button
        onClick={() => void i18n.changeLanguage('es')}
        size="sm"
        type="button"
        variant={i18n.language === 'es' ? 'primary' : 'ghost'}
      >
        {t('language.spanish')}
      </Button>
    </div>
  )
}
