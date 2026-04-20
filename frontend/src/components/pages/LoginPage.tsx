import { Link, useSearchParams, Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { LoginForm } from '@/components/organisms/LoginForm'
import { AuthShowcase } from '@/components/organisms/AuthShowcase'
import { useAuth } from '@/hooks/auth/useAuth'

export const LoginPage = () => {
  const { t } = useTranslation('platform')
  const [searchParams] = useSearchParams()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:items-start">
      <div className="space-y-6">
        <AuthShowcase
          description={t('login.heroDescription')}
          eyebrow={t('login.eyebrow')}
          highlights={[
            t('login.highlights.fastAccess'),
            t('login.highlights.memoryOnly'),
            t('login.highlights.refreshReady'),
          ]}
          title={t('login.title')}
        />
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/signup">{t('login.secondaryAction')}</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {searchParams.get('reason') === 'session-expired' ? (
          <div className="rounded-[1.5rem] border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground">
            {t('auth.sessionExpired')}
          </div>
        ) : null}
        <LoginForm />
      </div>
    </div>
  )
}
