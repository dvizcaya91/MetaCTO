import { LayoutDashboard, PencilLine } from 'lucide-react'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export const NavigationMenu = () => {
  const { t } = useTranslation('platform')

  return (
    <nav aria-label={t('navigation.label')} className="flex flex-wrap gap-2">
      <NavLink
        className={({ isActive }) =>
          cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
              : 'bg-card text-muted-foreground hover:text-foreground',
          )
        }
        end
        to="/"
      >
        <LayoutDashboard className="h-4 w-4" />
        {t('navigation.browse')}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
              : 'bg-card text-muted-foreground hover:text-foreground',
          )
        }
        to="/submit"
      >
        <PencilLine className="h-4 w-4" />
        {t('navigation.submit')}
      </NavLink>
    </nav>
  )
}
