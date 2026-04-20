import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/atoms/Badge'
import { FeatureRequestForm } from '@/components/organisms/FeatureRequestForm'

export const SubmitFeatureRequestPage = () => {
  const { t } = useTranslation('platform')

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
      <div className="space-y-5">
        <Badge variant="primary">{t('form.eyebrow')}</Badge>
        <div className="space-y-4">
          <h1 className="text-5xl font-black leading-none tracking-[-0.05em] text-foreground">
            {t('form.title')}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            {t('form.description')}
          </p>
        </div>
      </div>
      <FeatureRequestForm />
    </section>
  )
}
