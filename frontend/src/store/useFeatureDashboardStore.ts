import { create } from 'zustand'

import type { IFeatureListFilters } from '@/interfaces/features/IFeatureListFilters'

interface IFeatureDashboardStore extends IFeatureListFilters {
  goToNextPage: () => void
  goToPreviousPage: () => void
  setPage: (value: number) => void
  setQuery: (value: string) => void
  setSort: (value: IFeatureListFilters['sort']) => void
  setTab: (value: IFeatureListFilters['tab']) => void
}

const defaultState: IFeatureListFilters = {
  page: 1,
  pageSize: 9,
  query: '',
  sort: 'number_of_votes',
  tab: 'all',
}

export const useFeatureDashboardStore = create<IFeatureDashboardStore>((set) => ({
  ...defaultState,
  goToNextPage: () => set((state) => ({ page: state.page + 1 })),
  goToPreviousPage: () =>
    set((state) => ({ page: Math.max(state.page - 1, 1) })),
  setPage: (value) => set({ page: Math.max(value, 1) }),
  setQuery: (value) => set({ page: 1, query: value }),
  setSort: (value) => set({ page: 1, sort: value }),
  setTab: (value) => set({ page: 1, tab: value }),
}))
