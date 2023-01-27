import { NextApiRequest, NextApiResponse } from 'next'
import {
  SearchApiArgs,
  SearchApiResponse,
  runSearchApi,
} from 'utils/api/search'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SearchApiResponse>
) => {
  const { query, lang } = req.query as SearchApiArgs

  const response = await runSearchApi({ query, lang })

  res.json(response)
}

export default handler
