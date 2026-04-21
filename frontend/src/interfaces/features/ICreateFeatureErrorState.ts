import type { IAuthErrorState } from '@/interfaces/auth/IAuthErrorState'
import type { ISemanticDuplicateFeatureResponse } from '@/interfaces/features/ISemanticDuplicateFeatureResponse'

export interface ICreateFeatureErrorState extends IAuthErrorState {
  duplicateSuggestion: ISemanticDuplicateFeatureResponse | null
}
