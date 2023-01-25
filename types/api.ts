export interface ApiResponse<Data> {
  data: Data | null
  errorMessage: null | string
}
