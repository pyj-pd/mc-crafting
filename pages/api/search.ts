import { NextApiRequest, NextApiResponse } from 'next'
import { DEFAULT_STATUS_CODE } from 'types/api'
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

  const { statusCode = DEFAULT_STATUS_CODE, ...response } = await runSearchApi({
    query,
    lang,
  })

  res.status(statusCode).json(response)
}

export default handler
