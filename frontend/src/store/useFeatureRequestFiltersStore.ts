import { create } from 'zustand'

import type { IFeatureRequestFilters } from '@/interfaces/feature-requests/IFeatureRequestFilters'

interface IFeatureRequestFiltersStore extends IFeatureRequestFilters {
  resetFilters: () => void
  setSearchQuery: (value: string) => void
  setSortMode: (value: IFeatureRequestFilters['sortMode']) => void
}

const defaultFilters: IFeatureRequestFilters = {
  searchQuery: '',
  sortMode: 'most-voted',
}

export const useFeatureRequestFiltersStore = create<IFeatureRequestFiltersStore>(
  (set) => ({
    ...defaultFilters,
    resetFilters: () => set(defaultFilters),
    setSearchQuery: (value) => set({ searchQuery: value }),
    setSortMode: (value) => set({ sortMode: value }),
  }),
)
