import { LogOut } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher'
import { NavigationMenu } from '@/components/molecules/NavigationMenu'
import { useAuth } from '@/hooks/auth/useAuth'

export const AppShellTemplate = () => {
  const { t } = useTranslation('platform')
  const navigate = useNavigate()
  const { isAuthenticated, isSessionBootstrapping, signOut } = useAuth()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(0,117,255,0.18),transparent_28%),linear-gradient(180deg,#060816_0%,#0b1022_55%,#090d1a_100%)]" />
      <div className="absolute left-[10%] top-24 -z-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute right-[8%] top-16 -z-10 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-20 mb-10 rounded-[2rem] border border-border/80 bg-card/60 p-4 shadow-[0_32px_120px_-56px_rgba(0,117,255,0.5)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-end">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
              <NavigationMenu />
              <div className="flex items-center gap-3 rounded-full border border-border/80 bg-background/55 px-4 py-3 text-sm">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(0,117,255,0.75)]" />
                <span className="text-muted-foreground">
                  {isSessionBootstrapping
                    ? t('session.restoring')
                    : isAuthenticated
                      ? t('session.authenticated')
                      : t('session.guest')}
                </span>
              </div>
              {isAuthenticated ? (
                <Button
                  aria-label={t('session.signOut')}
                  onClick={() => {
                    signOut()
                    navigate('/login')
                  }}
                  type="button"
                  variant="outline"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              ) : null}
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <main className="flex-1 pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
