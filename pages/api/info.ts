import { NextApiRequest, NextApiResponse } from 'next'
import { InfoApiArgs, InfoApiResponse, runInfoApi } from 'utils/api/info'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<InfoApiResponse>
) => {
  const { file, id } = req.query as InfoApiArgs

  const response = await runInfoApi({ file, id })

  res.json(response)
}

export default handler
