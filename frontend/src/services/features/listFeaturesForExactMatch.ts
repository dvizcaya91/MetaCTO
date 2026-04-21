import type { IFeature } from '@/interfaces/features/IFeature'
import type { IFeatureListFilters } from '@/interfaces/features/IFeatureListFilters'
import type { IPaginatedFeatureListResponse } from '@/interfaces/features/IPaginatedFeatureListResponse'
import { apiPrivate } from '@/services/api/apiPrivate'
import { apiPublic } from '@/services/api/apiPublic'

const getApiClient = (isAuthenticated: boolean) =>
  isAuthenticated ? apiPrivate : apiPublic

const normalizeText = (value: string) => value.trim().toLowerCase()

const matchesExactly = (feature: IFeature, query: string) => {
  const normalizedQuery = normalizeText(query)

  return (
    normalizeText(feature.title) === normalizedQuery ||
    normalizeText(feature.description) === normalizedQuery
  )
}

export const listFeaturesForExactMatch = async (
  filters: IFeatureListFilters,
  isAuthenticated: boolean,
): Promise<IPaginatedFeatureListResponse> => {
  const apiClient = getApiClient(isAuthenticated)
  const accumulatedResults: IFeature[] = []
  let nextPage = 1
  let hasMorePages = true

  while (hasMorePages) {
    const { data } = await apiClient.get<IPaginatedFeatureListResponse>('/features/', {
      params: {
        mine: filters.tab === 'mine' || undefined,
        page: nextPage,
        page_size: 100,
        query: filters.query || undefined,
        sort: filters.sort,
        voted: filters.tab === 'voted' || undefined,
      },
    })

    accumulatedResults.push(...data.results)

    if (!data.next) {
      hasMorePages = false
      continue
    }

    nextPage += 1
  }

  const exactMatches = accumulatedResults.filter((feature) =>
    matchesExactly(feature, filters.query),
  )

  const pageStart = (filters.page - 1) * filters.pageSize
  const pageEnd = pageStart + filters.pageSize

  return {
    count: exactMatches.length,
    next: pageEnd < exactMatches.length ? `client:${filters.page + 1}` : null,
    previous: filters.page > 1 ? `client:${filters.page - 1}` : null,
    results: exactMatches.slice(pageStart, pageEnd),
  }
}
