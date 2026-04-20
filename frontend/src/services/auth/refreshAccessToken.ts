import type { IRefreshTokenRequest } from '@/interfaces/auth/IRefreshTokenRequest'
import type { IRefreshTokenResponse } from '@/interfaces/auth/IRefreshTokenResponse'
import { AUTH_REFRESH_PATH } from '@/services/api/config'
import { apiPublic } from '@/services/api/apiPublic'

export const refreshAccessToken = async (
  payload: IRefreshTokenRequest,
): Promise<IRefreshTokenResponse> => {
  const { data } = await apiPublic.post<IRefreshTokenResponse>(
    AUTH_REFRESH_PATH,
    payload,
  )

  return data
}
