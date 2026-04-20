import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'

export const NotFoundPage = () => {
  const { t } = useTranslation('platform')

  return (
    <section className="grid min-h-[50vh] place-items-center">
      <div className="max-w-xl space-y-5 rounded-[2rem] border border-border/70 bg-card/85 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          {t('notFound.title')}
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          {t('notFound.description')}
        </p>
        <Button asChild>
          <Link to="/">{t('notFound.action')}</Link>
        </Button>
      </div>
    </section>
  )
}
