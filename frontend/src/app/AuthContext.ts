import { createContext } from 'react'

import type { IAuthContextValue } from '@/interfaces/auth/IAuthContextValue'

export const AuthContext = createContext<IAuthContextValue | null>(null)
