import { Link, Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { SignupForm } from '@/components/organisms/SignupForm'
import { AuthShowcase } from '@/components/organisms/AuthShowcase'
import { useAuth } from '@/hooks/auth/useAuth'

export const SignupPage = () => {
  const { t } = useTranslation('platform')
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:items-start">
      <div className="space-y-6">
        <AuthShowcase
          description={t('signup.heroDescription')}
          eyebrow={t('signup.eyebrow')}
          highlights={[
            t('signup.highlights.instantTokens'),
            t('signup.highlights.passwordValidation'),
            t('signup.highlights.publicFlow'),
          ]}
          title={t('signup.title')}
        />
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/login">{t('signup.secondaryAction')}</Link>
          </Button>
        </div>
      </div>
      <SignupForm />
    </div>
  )
}
