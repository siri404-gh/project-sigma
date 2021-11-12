import React from 'react'

import { getSession } from '@auth0/nextjs-auth0'
import isbot from 'isbot'
import { GetServerSideProps } from 'next'

import Markdown from '@/components/Markdown/Markdown'
import { fetchUserData, postUrl } from '@/utils/fetchers'

const Post = ({ data }: { data: string }) => <Markdown>{data}</Markdown>

export default Post

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const { post } = params as { post: string }
  const isBot = isbot(req.headers['user-agent'])

  try {
    if (!isBot) {
      const session = getSession(req, res)
      const returnTo = `/courses/${post}`

      if (!session) {
        return {
          redirect: {
            destination: `/api/auth/login?returnTo=${returnTo}`,
            permanent: false,
          },
        }
      }

      const { tier } = await fetchUserData(session.user.sub)

      if (tier !== '1') {
        return {
          redirect: {
            destination: `/premium?returnTo=${returnTo}`,
            permanent: false,
          },
        }
      }
    }

    const _res = await fetch(postUrl('courses', post))
    const data = await _res.text()

    return {
      props: {
        data,
      },
    }
  } catch (error) {
    console.error(error)

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
