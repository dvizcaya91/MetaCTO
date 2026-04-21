import { useCallback, useEffect, useState } from 'react'

import { AuthContext } from '@/app/AuthContext'
import type { ICurrentUser } from '@/interfaces/auth/ICurrentUser'
import type { ILoginRequest } from '@/interfaces/auth/ILoginRequest'
import type { ISignupRequest } from '@/interfaces/auth/ISignupRequest'
import { getCurrentUser } from '@/services/auth/getCurrentUser'
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
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null)
  const [hasRefreshToken, setHasRefreshToken] = useState(false)
  const [isSessionBootstrapping, setIsSessionBootstrapping] = useState(true)

  useEffect(() => {
    setApiPrivateAccessToken(accessToken)
  }, [accessToken])

  const clearSession = useCallback(() => {
    clearRefreshToken()
    setApiPrivateAccessToken(null)
    setAccessToken(null)
    setCurrentUser(null)
    setHasRefreshToken(false)
  }, [])

  const establishSession = useCallback(async (
    nextAccessToken: string,
    nextRefreshToken: string,
  ) => {
    setApiPrivateAccessToken(nextAccessToken)

    try {
      const user = await getCurrentUser()

      writeRefreshToken(nextRefreshToken)
      setAccessToken(nextAccessToken)
      setCurrentUser(user)
      setHasRefreshToken(true)
    } catch (error) {
      clearSession()
      throw error
    }
  }, [clearSession])

  useEffect(() => {
    let isCancelled = false

    const restoreSession = async () => {
      const refreshToken = readRefreshToken()

      if (!refreshToken) {
        setHasRefreshToken(false)
        setCurrentUser(null)
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

        await establishSession(
          refreshedSession.access,
          refreshedSession.refresh ?? refreshToken,
        )
      } catch {
        if (isCancelled) {
          return
        }

        clearSession()
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
  }, [clearSession, establishSession])

  const signIn = async (payload: ILoginRequest) => {
    const tokens = await login(payload)

    await establishSession(tokens.access, tokens.refresh)
  }

  const signUp = async (payload: ISignupRequest) => {
    const tokens = await signup(payload)

    await establishSession(tokens.access, tokens.refresh)
  }

  const signOut = () => {
    clearSession()
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        currentUser,
        hasRefreshToken,
        isAuthenticated: Boolean(accessToken && currentUser),
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
