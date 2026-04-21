export interface IFeatureListFilters {
  page: number
  pageSize: number
  query: string
  sort: 'created_at' | 'last_voted_at' | 'number_of_votes'
  tab: 'all' | 'mine' | 'voted'
}
