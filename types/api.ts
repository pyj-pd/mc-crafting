export interface ApiResponse<Data> {
  data: Data | null
  errorMessage: null | string
  statusCode?: number
}

export const DEFAULT_STATUS_CODE = 200

export type ApiFunction<Response, Argument> = (
  arg: Argument
) => Promise<Response>
