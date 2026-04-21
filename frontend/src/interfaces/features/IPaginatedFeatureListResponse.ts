import type { IFeature } from '@/interfaces/features/IFeature'

export interface IPaginatedFeatureListResponse {
  count: number
  next: string | null
  previous: string | null
  results: IFeature[]
}
