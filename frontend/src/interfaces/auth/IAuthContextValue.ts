import type { ILoginRequest } from '@/interfaces/auth/ILoginRequest'
import type { ISignupRequest } from '@/interfaces/auth/ISignupRequest'

export interface IAuthContextValue {
  accessToken: string | null
  hasRefreshToken: boolean
  isAuthenticated: boolean
  isSessionBootstrapping: boolean
  signIn: (payload: ILoginRequest) => Promise<void>
  signOut: () => void
  signUp: (payload: ISignupRequest) => Promise<void>
}
