import type { IFeatureRequestFilters } from '@/interfaces/feature-requests/IFeatureRequestFilters'
import type { IFeatureRequestsResponse } from '@/interfaces/feature-requests/IFeatureRequestsResponse'
import { getMockFeatureRequestsResponse } from '@/mocks/featureRequests'
import { apiPublic } from '@/services/api/apiPublic'

const normalizeResponse = (
  response: IFeatureRequestsResponse,
): IFeatureRequestsResponse => ({
  items: response.items,
  meta: {
    dataSource: 'api',
    filteredCount: response.meta.filteredCount ?? response.items.length,
    totalCount: response.meta.totalCount ?? response.items.length,
  },
})

export const getFeatureRequests = async (
  filters: IFeatureRequestFilters,
): Promise<IFeatureRequestsResponse> => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    return getMockFeatureRequestsResponse(filters)
  }

  const { data } = await apiPublic.get<IFeatureRequestsResponse>(
    '/feature-requests/',
    {
      params: {
        ordering:
          filters.sortMode === 'most-voted' ? '-votes_count' : '-created_at',
        search: filters.searchQuery || undefined,
      },
    },
  )

  return normalizeResponse(data)
}
