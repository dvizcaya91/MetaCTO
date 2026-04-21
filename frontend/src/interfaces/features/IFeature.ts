export interface IFeature {
  created_at: string
  description: string
  has_voted: boolean
  id: number
  is_owner: boolean
  last_voted_at: string | null
  number_of_votes: number
  owner: number
  title: string
  updated_at: string
}
