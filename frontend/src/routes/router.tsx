import { createBrowserRouter, Navigate } from 'react-router'

import { DashboardPage } from '@/components/pages/DashboardPage'
import { LoginPage } from '@/components/pages/LoginPage'
import { NotFoundPage } from '@/components/pages/NotFoundPage'
import { SignupPage } from '@/components/pages/SignupPage'
import { AppShellTemplate } from '@/components/templates/AppShellTemplate'

export const appRouter = createBrowserRouter([
  {
    children: [
      {
        element: <Navigate replace to="/login" />,
        index: true,
      },
      {
        element: <SignupPage />,
        path: 'signup',
      },
      {
        element: <LoginPage />,
        path: 'login',
      },
      {
        element: <DashboardPage />,
        path: 'dashboard',
      },
      {
        element: <NotFoundPage />,
        path: '*',
      },
    ],
    element: <AppShellTemplate />,
    path: '/',
  },
])
