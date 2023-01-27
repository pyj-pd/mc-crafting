import { NextApiRequest, NextApiResponse } from 'next'
import { DEFAULT_STATUS_CODE } from 'types/api'
import { InfoApiArgs, InfoApiResponse, runInfoApi } from 'utils/api/info'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<InfoApiResponse>
) => {
  const { file, id } = req.query as InfoApiArgs

  const { statusCode = DEFAULT_STATUS_CODE, ...response } = await runInfoApi({
    file,
    id,
  })

  res.status(statusCode).json(response)
}

export default handler
