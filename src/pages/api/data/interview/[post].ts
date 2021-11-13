import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

import { fetchUserData } from '@/utils/fetchers'

export default async function ProtectedRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { post } = req.query
  const session = getSession(req, res)

  const returnTo = `/interview/${post}`

  if (!session) {
    return res.status(401).json({
      data: '',
      message: 'Unauthorized',
      redirect: `/api/auth/login?returnTo=${returnTo}`,
    })
  }

  const { tier } = await fetchUserData(session.user.sub)

  if (tier !== '1') {
    return res.status(403).json({
      data: '',
      message: 'Forbidden',
      redirect: `/premium?returnTo=${returnTo}`,
    })
  }

  const url = `https://raw.githubusercontent.com/sreeramofficial/blog-posts/master/interview/${post}.md`
  const _res = await fetch(url)
  const data = await _res.text()
  return res.json({
    data,
  })
}
