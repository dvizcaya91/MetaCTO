import type { IFeatureRequest } from '@/interfaces/feature-requests/IFeatureRequest'
import type { IFeatureRequestFilters } from '@/interfaces/feature-requests/IFeatureRequestFilters'
import type { IFeatureRequestsResponse } from '@/interfaces/feature-requests/IFeatureRequestsResponse'

const FEATURE_REQUESTS: IFeatureRequest[] = [
  {
    category: 'Workflow',
    createdAt: '2026-04-14T09:00:00.000Z',
    description:
      'Let teams cluster requests into reusable product themes so PMs can review a single demand stream instead of scattered duplicates.',
    id: 'feature-request-1',
    submittedBy: 'Avery Chen',
    title: 'Merge duplicate requests automatically',
    votesCount: 124,
  },
  {
    category: 'Insights',
    createdAt: '2026-04-17T13:30:00.000Z',
    description:
      'Surface a weekly digest with the fastest-rising requests and the segments behind them so prioritization happens with current signals.',
    id: 'feature-request-2',
    submittedBy: 'Jordan Brooks',
    title: 'Weekly trend digest for top ideas',
    votesCount: 97,
  },
  {
    category: 'Collaboration',
    createdAt: '2026-04-19T08:15:00.000Z',
    description:
      'Allow internal teams to add private context, delivery notes, and estimated scope on top of public requests without exposing those details.',
    id: 'feature-request-3',
    submittedBy: 'Sam Rivera',
    title: 'Internal notes on feature requests',
    votesCount: 82,
  },
  {
    category: 'Reporting',
    createdAt: '2026-04-11T16:45:00.000Z',
    description:
      'Export ranked requests into CSV so product operations can share snapshots with stakeholders who work outside the app.',
    id: 'feature-request-4',
    submittedBy: 'Taylor Morgan',
    title: 'CSV export for ranked backlog',
    votesCount: 63,
  },
]

const sortFeatureRequests = (
  featureRequests: IFeatureRequest[],
  sortMode: IFeatureRequestFilters['sortMode'],
) =>
  [...featureRequests].sort((left, right) => {
    if (sortMode === 'newest') {
      return (
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
      )
    }

    return right.votesCount - left.votesCount
  })

export const getMockFeatureRequestsResponse = (
  filters: IFeatureRequestFilters,
): IFeatureRequestsResponse => {
  const normalizedQuery = filters.searchQuery.trim().toLowerCase()

  const filteredItems = FEATURE_REQUESTS.filter((request) => {
    if (!normalizedQuery) {
      return true
    }

    return [request.title, request.description, request.category]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  })

  return {
    items: sortFeatureRequests(filteredItems, filters.sortMode),
    meta: {
      dataSource: 'mock',
      filteredCount: filteredItems.length,
      totalCount: FEATURE_REQUESTS.length,
    },
  }
}

export const FEATURE_REQUESTS_FALLBACK_RESPONSE = getMockFeatureRequestsResponse({
  searchQuery: '',
  sortMode: 'most-voted',
})
