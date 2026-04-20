import { useEffect, useState } from 'react'

import { AuthContext } from '@/app/AuthContext'
import type { ILoginRequest } from '@/interfaces/auth/ILoginRequest'
import type { ISignupRequest } from '@/interfaces/auth/ISignupRequest'
import { refreshAccessToken } from '@/services/auth/refreshAccessToken'
import { clearRefreshToken, readRefreshToken, writeRefreshToken } from '@/services/auth/tokenStorage'
import { login } from '@/services/auth/login'
import { signup } from '@/services/auth/signup'
import { setApiPrivateAccessToken } from '@/services/api/apiPrivate'

interface IAuthProviderProps {
  children: React.ReactNode
}

const redirectToLogin = () => {
  const nextLocation = '/login?reason=session-expired'

  if (window.location.pathname === '/login') {
    return
  }

  window.location.replace(nextLocation)
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [hasRefreshToken, setHasRefreshToken] = useState(false)
  const [isSessionBootstrapping, setIsSessionBootstrapping] = useState(true)

  useEffect(() => {
    setApiPrivateAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    let isCancelled = false

    const restoreSession = async () => {
      const refreshToken = readRefreshToken()

      if (!refreshToken) {
        setHasRefreshToken(false)
        setIsSessionBootstrapping(false)
        return
      }

      setHasRefreshToken(true)

      try {
        const refreshedSession = await refreshAccessToken({
          refresh: refreshToken,
        })

        if (isCancelled) {
          return
        }

        setAccessToken(refreshedSession.access)

        if (refreshedSession.refresh) {
          writeRefreshToken(refreshedSession.refresh)
        }
      } catch {
        if (isCancelled) {
          return
        }

        clearRefreshToken()
        setHasRefreshToken(false)
        setAccessToken(null)
        redirectToLogin()
      } finally {
        if (!isCancelled) {
          setIsSessionBootstrapping(false)
        }
      }
    }

    void restoreSession()

    return () => {
      isCancelled = true
    }
  }, [])

  const persistSession = (nextAccessToken: string, nextRefreshToken: string) => {
    setAccessToken(nextAccessToken)
    setHasRefreshToken(true)
    writeRefreshToken(nextRefreshToken)
  }

  const signIn = async (payload: ILoginRequest) => {
    const tokens = await login(payload)

    persistSession(tokens.access, tokens.refresh)
  }

  const signUp = async (payload: ISignupRequest) => {
    const tokens = await signup(payload)

    persistSession(tokens.access, tokens.refresh)
  }

  const signOut = () => {
    clearRefreshToken()
    setAccessToken(null)
    setHasRefreshToken(false)
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        hasRefreshToken,
        isAuthenticated: Boolean(accessToken),
        isSessionBootstrapping,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
