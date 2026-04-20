import { Link } from 'react-router'
import { CheckCircle2, KeyRound, ShieldEllipsis, UserLock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Skeleton } from '@/components/atoms/Skeleton'
import { useAuth } from '@/hooks/auth/useAuth'

const StatusCard = ({
  description,
  icon,
  title,
  value,
}: {
  description: string
  icon: React.ReactNode
  title: string
  value: string
}) => (
  <article className="rounded-[1.75rem] border border-border/80 bg-card/75 p-5 backdrop-blur-2xl">
    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/12 text-primary">
      {icon}
    </div>
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {title}
    </p>
    <p className="mt-3 text-2xl font-black tracking-tight text-foreground">
      {value}
    </p>
    <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
  </article>
)

export const DashboardPage = () => {
  const { t } = useTranslation('platform')
  const {
    accessToken,
    hasRefreshToken,
    isAuthenticated,
    isSessionBootstrapping,
  } = useAuth()

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-border/80 bg-card/70 p-8 shadow-[0_36px_120px_-52px_rgba(0,117,255,0.5)] backdrop-blur-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Badge variant="primary">{t('dashboard.eyebrow')}</Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-black leading-none tracking-[-0.05em] text-foreground md:text-6xl">
                {t('dashboard.title')}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                {t('dashboard.description')}
              </p>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-background/55 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t('dashboard.routeVisibility')}
            </p>
            <p className="mt-2 text-lg font-bold text-foreground">
              {t('dashboard.routeVisibilityValue')}
            </p>
          </div>
        </div>
      </section>

      {isSessionBootstrapping ? (
        <section className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-44 w-full rounded-[1.75rem]" />
          <Skeleton className="h-44 w-full rounded-[1.75rem]" />
          <Skeleton className="h-44 w-full rounded-[1.75rem]" />
        </section>
      ) : null}

      {!isSessionBootstrapping ? (
        <section className="grid gap-4 md:grid-cols-3">
          <StatusCard
            description={t('dashboard.cards.sessionDescription')}
            icon={<ShieldEllipsis className="h-5 w-5" />}
            title={t('dashboard.cards.sessionTitle')}
            value={
              isAuthenticated
                ? t('dashboard.cards.sessionActive')
                : t('dashboard.cards.sessionInactive')
            }
          />
          <StatusCard
            description={t('dashboard.cards.accessDescription')}
            icon={<UserLock className="h-5 w-5" />}
            title={t('dashboard.cards.accessTitle')}
            value={
              accessToken
                ? t('dashboard.cards.accessPresent')
                : t('dashboard.cards.accessMissing')
            }
          />
          <StatusCard
            description={t('dashboard.cards.refreshDescription')}
            icon={<KeyRound className="h-5 w-5" />}
            title={t('dashboard.cards.refreshTitle')}
            value={
              hasRefreshToken
                ? t('dashboard.cards.refreshPresent')
                : t('dashboard.cards.refreshMissing')
            }
          />
        </section>
      ) : null}

      {!isSessionBootstrapping ? (
        <section className="rounded-[2rem] border border-border/80 bg-card/65 p-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <CheckCircle2 className="h-4 w-4" />
                {isAuthenticated
                  ? t('dashboard.summary.authenticatedLabel')
                  : t('dashboard.summary.guestLabel')}
              </div>
              <h2 className="text-3xl font-black tracking-tight text-foreground">
                {isAuthenticated
                  ? t('dashboard.summary.authenticatedTitle')
                  : t('dashboard.summary.guestTitle')}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {isAuthenticated
                  ? t('dashboard.summary.authenticatedDescription')
                  : t('dashboard.summary.guestDescription')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {isAuthenticated ? null : (
                <>
                  <Button asChild>
                    <Link to="/login">{t('dashboard.summary.loginAction')}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/signup">{t('dashboard.summary.signupAction')}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
