import React from 'react'

import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'

import Markdown from '@/components/Markdown/Markdown'
import { fetchUserData } from '@/utils/fetchers'

const Post = ({ data }: { data: string }) => <Markdown>{data}</Markdown>

export default Post

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const { post } = params as { post: string }
  try {
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

    const url = `https://raw.githubusercontent.com/sreeramofficial/blog-posts/master/courses/${post}.md`
    const _res = await fetch(url)
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
  // return data
  // return {
  //   props: { data },
  // }
}
