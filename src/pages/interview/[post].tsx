import React, { Fragment } from 'react'

import { getSession } from '@auth0/nextjs-auth0'
import isbot from 'isbot'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import Markdown from '@/components/Markdown/Markdown'
import config from '@/config'
import { fetchUserData, postUrl, fetchNavlinks } from '@/utils/fetchers'

const Post = ({
  data,
  title,
  url,
}: {
  data: string
  title: string
  url: string
}) => (
  <Fragment>
    <Head>
      <title>{title}</title>
      <meta content={title} name='og:title' />
      <meta content={url} name='og:url' />
      <meta content={url} name='canonical' />
      <script type='application/ld+json'>
        {`
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${url}"
  },
  "headline": "${title}",
  "image": [
    "${process.env.NEXT_PUBLIC_DOMAIN}/icon-256.jpg",
    "${config.seo.ogImage}"
  ],
  "author": {
    "@type": "Person",
    "name": "${config.seo.author}"
  },
}
        `}
      </script>
    </Head>
    <Markdown>{data}</Markdown>
  </Fragment>
)

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
      const returnTo = `/interview/${post}`

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

    const _res = await fetch(postUrl('interview', post))
    const data = await _res.text()
    const navlinks = await fetchNavlinks()
    const section = navlinks.links.find(
      (link: { url: string }) => link.url === `/interview`,
    )
    const { title, url } = section.links.find(
      (link: { url: string }) => link.url === `/interview/${post}`,
    )

    return {
      props: {
        data,
        title: `${title} | ${config.seo.title}`,
        url: process.env.NEXT_PUBLIC_DOMAIN + url,
      },
      revalidate: 60 * 60,
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
