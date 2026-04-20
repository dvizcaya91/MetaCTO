import { LayoutDashboard, LogIn, UserPlus } from 'lucide-react'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/hooks/auth/useAuth'
import { cn } from '@/lib/utils'

export const NavigationMenu = () => {
  const { t } = useTranslation('platform')
  const { isAuthenticated } = useAuth()

  return (
    <nav aria-label={t('navigation.label')} className="flex flex-wrap gap-2">
      <NavLink
        className={({ isActive }) =>
          cn(
            'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground shadow-[0_0_32px_rgba(0,117,255,0.35)]'
              : 'bg-card/70 text-muted-foreground hover:text-foreground',
          )
        }
        to="/dashboard"
      >
        <LayoutDashboard className="h-4 w-4" />
        {t('navigation.dashboard')}
      </NavLink>
      {!isAuthenticated ? (
        <>
          <NavLink
            className={({ isActive }) =>
              cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-[0_0_32px_rgba(0,117,255,0.35)]'
                  : 'bg-card/70 text-muted-foreground hover:text-foreground',
              )
            }
            to="/login"
          >
            <LogIn className="h-4 w-4" />
            {t('navigation.login')}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-[0_0_32px_rgba(0,117,255,0.35)]'
                  : 'bg-card/70 text-muted-foreground hover:text-foreground',
              )
            }
            to="/signup"
          >
            <UserPlus className="h-4 w-4" />
            {t('navigation.signup')}
          </NavLink>
        </>
      ) : null}
    </nav>
  )
}
