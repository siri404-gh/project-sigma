import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

import { writeUserData } from '@/pages/api/database'

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { returnTo = '/' } = req.query
  try {
    const session = await getSession(req, res)
    if (!session)
      return res.redirect(
        `/api/auth/login?returnTo=/api/stripe/callback?returnTo=${returnTo}`,
      )

    const {
      user: { sub: custId },
    } = session
    await writeUserData(custId, '1')

    res.redirect(`${returnTo}?payment=success&type=success`)
  } catch (error) {
    res.redirect(`${returnTo}?payment=failure&type=error`)
  }
}
