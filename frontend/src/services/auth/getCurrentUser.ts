import type { ICurrentUser } from '@/interfaces/auth/ICurrentUser'
import { apiPrivate } from '@/services/api/apiPrivate'

export const getCurrentUser = async (): Promise<ICurrentUser> => {
  const { data } = await apiPrivate.get<ICurrentUser>('/users/me/')

  return data
}
