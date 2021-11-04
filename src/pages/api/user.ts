import { NextApiRequest, NextApiResponse } from 'next'

import { readUserData } from './database'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { custId },
    } = req
    const stringifiedCustId = custId as string
    const _res = await readUserData(stringifiedCustId)
    if (!_res) return res.send({})
    return res.json(_res)
  } catch (error) {
    console.error(error)
  }
}
