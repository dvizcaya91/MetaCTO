import type { IFeatureListFilters } from '@/interfaces/features/IFeatureListFilters'
import type { IPaginatedFeatureListResponse } from '@/interfaces/features/IPaginatedFeatureListResponse'
import { apiPrivate } from '@/services/api/apiPrivate'
import { apiPublic } from '@/services/api/apiPublic'

const getApiClient = (isAuthenticated: boolean) =>
  isAuthenticated ? apiPrivate : apiPublic

export const listFeatures = async (
  filters: IFeatureListFilters,
  isAuthenticated: boolean,
): Promise<IPaginatedFeatureListResponse> => {
  const apiClient = getApiClient(isAuthenticated)

  const { data } = await apiClient.get<IPaginatedFeatureListResponse>('/features/', {
    params: {
      mine: filters.tab === 'mine' || undefined,
      page: filters.page,
      page_size: filters.pageSize,
      query: filters.query || undefined,
      sort: filters.sort,
      voted: filters.tab === 'voted' || undefined,
    },
  })

  return data
}
