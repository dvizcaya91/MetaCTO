import type { IFeature } from '@/interfaces/features/IFeature'

export interface ISemanticDuplicateFeatureResponse {
  can_force: boolean
  code: 'semantic_duplicate'
  confidence: number
  detail: string
  reason: string
  similar_feature: IFeature
  similarity: number
}
