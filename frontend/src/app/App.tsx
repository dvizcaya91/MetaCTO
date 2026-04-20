import { RouterProvider } from 'react-router'

import { AuthProvider } from '@/app/AuthProvider'
import { appRouter } from '@/routes/router'

export const App = () => (
  <AuthProvider>
    <RouterProvider router={appRouter} />
  </AuthProvider>
)
