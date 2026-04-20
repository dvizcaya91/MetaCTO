import { Link, Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher'
import { NavigationMenu } from '@/components/molecules/NavigationMenu'

export const AppShellTemplate = () => {
  const { t } = useTranslation('platform')

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(214,96,55,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(20,148,130,0.18),transparent_28%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-20 mb-10 rounded-[2rem] border border-border/70 bg-background/75 p-4 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.65)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <Link className="space-y-1" to="/">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                MetaCTO
              </p>
              <p className="text-lg font-black tracking-tight text-foreground">
                {t('meta.appName')}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('meta.tagline')}
              </p>
            </Link>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
              <NavigationMenu />
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
