export interface IAuthErrorState {
  detail: string | null
  fieldErrors: Record<string, string>
  hasNetworkError: boolean
  statusCode: number | null
}
