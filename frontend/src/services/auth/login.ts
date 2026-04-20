import type { ILoginRequest } from '@/interfaces/auth/ILoginRequest'
import type { ITokenPair } from '@/interfaces/auth/ITokenPair'
import { apiPublic } from '@/services/api/apiPublic'

export const login = async (payload: ILoginRequest): Promise<ITokenPair> => {
  const { data } = await apiPublic.post<ITokenPair>('/auth/login/', payload)

  return data
}
