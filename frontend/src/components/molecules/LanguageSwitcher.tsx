import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('platform')

  return (
    <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/90 p-1">
      <span className="inline-flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Languages className="h-3.5 w-3.5" />
        {t('language.label')}
      </span>
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
