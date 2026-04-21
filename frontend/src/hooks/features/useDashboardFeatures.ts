import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

import type { IFeature } from '@/interfaces/features/IFeature'
import type { IFeatureListFilters } from '@/interfaces/features/IFeatureListFilters'
import type { IPaginatedFeatureListResponse } from '@/interfaces/features/IPaginatedFeatureListResponse'
import { useAuth } from '@/hooks/auth/useAuth'
import { getAuthErrorState } from '@/services/auth/getAuthErrorState'
import { listFeatures } from '@/services/features/listFeatures'
import { listFeaturesForExactMatch } from '@/services/features/listFeaturesForExactMatch'
import { unvoteFeature } from '@/services/features/unvoteFeature'
import { voteForFeature } from '@/services/features/voteForFeature'
import { useFeatureDashboardStore } from '@/store/useFeatureDashboardStore'

const listDashboardFeatures = async (
  filters: IFeatureListFilters,
  isAuthenticated: boolean,
) => {
  if (filters.query.trim()) {
    return listFeaturesForExactMatch(filters, isAuthenticated)
  }

  return listFeatures(filters, isAuthenticated)
}

export const useDashboardFeatures = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('platform')
  const { isAuthenticated } = useAuth()
  const [activeVoteFeatureId, setActiveVoteFeatureId] = useState<number | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const page = useFeatureDashboardStore((state) => state.page)
  const pageSize = useFeatureDashboardStore((state) => state.pageSize)
  const query = useFeatureDashboardStore((state) => state.query)
  const setPage = useFeatureDashboardStore((state) => state.setPage)
  const setQuery = useFeatureDashboardStore((state) => state.setQuery)
  const sort = useFeatureDashboardStore((state) => state.sort)
  const setSort = useFeatureDashboardStore((state) => state.setSort)
  const tab = useFeatureDashboardStore((state) => state.tab)
  const setTab = useFeatureDashboardStore((state) => state.setTab)
  const [debouncedQuery] = useDebounce(query, 350)

  const filters: IFeatureListFilters = {
    page,
    pageSize,
    query: debouncedQuery.trim(),
    sort,
    tab,
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    IPaginatedFeatureListResponse,
    Error
  >(
    ['dashboard-features', isAuthenticated, filters.page, filters.pageSize, filters.query, filters.sort, filters.tab],
    () => listDashboardFeatures(filters, isAuthenticated),
    {
      revalidateOnFocus: false,
    },
  )

  const totalCount = data?.count ?? 0
  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1)

  const handleVoteToggle = async (feature: IFeature) => {
    setActionError(null)

    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setActiveVoteFeatureId(feature.id)

    try {
      if (feature.has_voted) {
        await unvoteFeature(feature.id)
      } else {
        await voteForFeature(feature.id)
      }

      await mutate()
    } catch (mutationError) {
      const errorState = getAuthErrorState(mutationError)

      if (errorState.detail) {
        setActionError(errorState.detail)
      } else if (errorState.hasNetworkError) {
        setActionError(t('features.errors.network'))
      } else if (errorState.statusCode === 404) {
        setActionError(t('features.errors.notFound'))
      } else if (errorState.statusCode === 401) {
        navigate('/login')
      } else {
        setActionError(t('features.errors.unexpected'))
      }
    } finally {
      setActiveVoteFeatureId(null)
    }
  }

  return {
    actionError,
    activeVoteFeatureId,
    closeCreateModal: () => setIsCreateModalOpen(false),
    currentPage: page,
    errorMessage: error?.message ?? null,
    features: data?.results ?? [],
    isCreateModalOpen,
    isLoading,
    isRefreshing: isValidating,
    openCreateModal: () => setIsCreateModalOpen(true),
    onSearchChange: setQuery,
    onSortChange: setSort,
    onTabChange: setTab,
    onToggleVote: handleVoteToggle,
    pageSize,
    query,
    refresh: mutate,
    setPage,
    sort,
    tab,
    totalCount,
    totalPages,
  }
}
