import type { ISignupRequest } from '@/interfaces/auth/ISignupRequest'
import type { ITokenPair } from '@/interfaces/auth/ITokenPair'
import { apiPublic } from '@/services/api/apiPublic'

export const signup = async (payload: ISignupRequest): Promise<ITokenPair> => {
  const { data } = await apiPublic.post<ITokenPair>('/auth/signup/', payload)

  return data
}
