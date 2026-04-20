import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

import type { IFeatureRequestFilters } from '@/interfaces/feature-requests/IFeatureRequestFilters'
import type { IFeatureRequestsResponse } from '@/interfaces/feature-requests/IFeatureRequestsResponse'
import { FEATURE_REQUESTS_FALLBACK_RESPONSE } from '@/mocks/featureRequests'
import { getFeatureRequests } from '@/services/feature-requests/getFeatureRequests'
import { useFeatureRequestFiltersStore } from '@/store/useFeatureRequestFiltersStore'

export const useFeatureRequests = () => {
  const searchQuery = useFeatureRequestFiltersStore((state) => state.searchQuery)
  const setSearchQuery = useFeatureRequestFiltersStore(
    (state) => state.setSearchQuery,
  )
  const sortMode = useFeatureRequestFiltersStore((state) => state.sortMode)
  const setSortMode = useFeatureRequestFiltersStore((state) => state.setSortMode)
  const [debouncedSearchQuery] = useDebounce(searchQuery, 350)

  const filters: IFeatureRequestFilters = {
    searchQuery: debouncedSearchQuery,
    sortMode,
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    IFeatureRequestsResponse,
    Error
  >(
    ['feature-requests', filters.searchQuery, filters.sortMode],
    () => getFeatureRequests(filters),
    {
      fallbackData: FEATURE_REQUESTS_FALLBACK_RESPONSE,
      revalidateOnFocus: false,
    },
  )

  const response = data ?? FEATURE_REQUESTS_FALLBACK_RESPONSE

  return {
    dataSource: response.meta.dataSource,
    errorMessage: error?.message ?? null,
    filteredCount: response.meta.filteredCount,
    isLoading,
    isRefreshing: isValidating,
    refresh: mutate,
    requests: response.items,
    searchQuery,
    setSearchQuery,
    setSortMode,
    sortMode,
    totalCount: response.meta.totalCount,
  }
}
