import type { ICreateFeatureRequest } from '@/interfaces/features/ICreateFeatureRequest'
import type { IFeature } from '@/interfaces/features/IFeature'
import { apiPrivate } from '@/services/api/apiPrivate'

export const createFeature = async (
  payload: ICreateFeatureRequest,
): Promise<IFeature> => {
  const { data } = await apiPrivate.post<IFeature>('/features/', payload)

  return data
}
