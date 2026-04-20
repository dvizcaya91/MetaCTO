const REFRESH_TOKEN_STORAGE_KEY = 'metacto.refresh-token'

export const clearRefreshToken = () => {
  window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
}

export const readRefreshToken = () =>
  window.localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)

export const writeRefreshToken = (refreshToken: string) => {
  window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
}
