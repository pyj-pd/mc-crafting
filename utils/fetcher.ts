import axios from 'axios'
// AXIOS SUCKS

export interface FetcherArgs {
  url: string
  params?: unknown
}

/**
 * Fetcher used on useSWR hook
 */
const fetcher = async ({ url, params = {} }: FetcherArgs) => {
  const res = await axios.get(url, { params }).then((res) => res.data)

  return res
}

export default fetcher
