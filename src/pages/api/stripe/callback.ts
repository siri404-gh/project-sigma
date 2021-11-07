import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

import { writeUserData } from '@/pages/api/database'

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await getSession(req, res)
    if (!session)
      return res.redirect('/api/auth/login?returnTo=/api/stripe/callback')

    const {
      user: { sub: custId },
    } = session
    await writeUserData(custId, '1')

    res.redirect('/api/auth/login?returnTo=/?payment=success')
  } catch (error) {
    res.redirect('/api/auth/login?returnTo=/?payment=failure')
  }
}
