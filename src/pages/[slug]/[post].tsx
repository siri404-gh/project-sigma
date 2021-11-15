import React, { Fragment } from 'react'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import Adsense from '@/components/Adsense/Adsense'
import Markdown from '@/components/Markdown/Markdown'
import config from '@/config'
import { postUrl, fetchNavlinks } from '@/utils/fetchers'
import { flatLinks, getPathsSlugPost } from '@/utils/helpers'

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
    </Head>
    <Markdown>{data}</Markdown>
    <Adsense
      adClient='ca-pub-6831276331714408'
      adFormat='auto'
      adSlot='2050444739'
      data-full-width-responsive='true'
    />
  </Fragment>
)

export default Post

export async function getStaticPaths() {
  const navlinks = await fetchNavlinks()
  const flatNavLinks = flatLinks(
    navlinks,
    'links',
    'url',
    1,
    ({ title }) => title !== 'Interview',
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paths = getPathsSlugPost(flatNavLinks)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug, post } = params as { slug: string; post: string }

  const navlinks = await fetchNavlinks()
  const section = navlinks.links.find(
    (link: { url: string }) => link.url === `/${slug}`,
  )
  const { title, url } = section.links.find(
    (link: { url: string }) => link.url === `/${slug}/${post}`,
  )

  const res = await fetch(postUrl(slug, post))
  const data = await res.text()

  return {
    props: {
      data,
      title: `${title} | ${config.seo.title}`,
      url: process.env.NEXT_PUBLIC_DOMAIN + url,
    },
  }
}
