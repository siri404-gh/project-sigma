import React from 'react'

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'

import Markdown from '@/components/Markdown/Markdown'
import { fetchPost, fetchUserData } from '@/utils/fetchers'

export default ({ data }: { data: string }) => <Markdown>{data}</Markdown>

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res)
    if (!session)
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    const { tier } = await fetchUserData(session?.user.sub)
    console.log('tier', tier)
    if (tier !== '1')
      return {
        redirect: {
          destination: '/premium',
          permanent: false,
        },
      }

    const data = await fetchPost('courses', ctx.params?.post?.toString())
    return {
      props: {
        data,
      },
    }
  },
})
