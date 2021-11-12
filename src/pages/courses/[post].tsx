import React from 'react'

import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'

import Markdown from '@/components/Markdown/Markdown'
import { fetchUserData } from '@/utils/fetchers'

export default ({ data }: { data: string }) => <Markdown>{data}</Markdown>

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  // const data = ''
  // get post
  const { post } = params as { post: string }
  // try {
  //   // get response from /api/courses/post
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_DOMAIN}/api/data/courses/${post}`,
  //     {
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore
  //       headers: { cookie: req.headers.cookie },
  //     },
  //   )
  //   // get data, message, redirect from response
  //   const { data: jsonData, redirect } = await res.json()
  //   // if redirect, redirect to url
  //   if (res.status === 401 || res.status === 403) {
  //     return {
  //       redirect: {
  //         destination: redirect,
  //         permanent: false,
  //       },
  //     }
  //   }
  //   // if data, set data
  //   data = jsonData
  // } catch (error) {
  //   // if error, redirect to home
  //   console.error(error)
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }
  try {
    const session = getSession(req, res)
    const returnTo = `/courses/${post}`

    if (!session) {
      return {
        redirect: {
          destination: `/api/login?returnTo=${returnTo}`,
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
