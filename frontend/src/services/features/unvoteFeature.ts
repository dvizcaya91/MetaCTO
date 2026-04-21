import type { IFeature } from '@/interfaces/features/IFeature'
import { apiPrivate } from '@/services/api/apiPrivate'

export const unvoteFeature = async (featureId: number): Promise<IFeature> => {
  const { data } = await apiPrivate.post<IFeature>(`/features/${featureId}/unvote/`)

  return data
}
