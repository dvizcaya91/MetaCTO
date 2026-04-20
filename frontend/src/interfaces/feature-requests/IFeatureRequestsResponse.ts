import type { IFeatureRequest } from '@/interfaces/feature-requests/IFeatureRequest'

export interface IFeatureRequestsResponse {
  items: IFeatureRequest[]
  meta: {
    dataSource: 'api' | 'mock'
    filteredCount: number
    totalCount: number
  }
}
