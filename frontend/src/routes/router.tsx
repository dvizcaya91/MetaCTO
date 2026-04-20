import { createBrowserRouter } from 'react-router'

import { FeatureRequestsPage } from '@/components/pages/FeatureRequestsPage'
import { NotFoundPage } from '@/components/pages/NotFoundPage'
import { SubmitFeatureRequestPage } from '@/components/pages/SubmitFeatureRequestPage'
import { AppShellTemplate } from '@/components/templates/AppShellTemplate'

export const appRouter = createBrowserRouter([
  {
    children: [
      {
        element: <FeatureRequestsPage />,
        index: true,
      },
      {
        element: <SubmitFeatureRequestPage />,
        path: 'submit',
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
