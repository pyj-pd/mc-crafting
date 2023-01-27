export interface ApiResponse<Data> {
  data: Data | null
  errorMessage: null | string
}

export type ApiFunction<Response, Argument> = (
  arg: Argument
) => Promise<Response>
