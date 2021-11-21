import React, { Fragment } from 'react'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import Markdown from '@/components/Markdown/Markdown'
import config from '@/config'
import { postUrl, fetchNavlinks } from '@/utils/fetchers'
import { flatLinks, getPathsSlugPost } from '@/utils/helpers'
import { useScroll } from '@/utils/hooks'

const Post = ({
  data,
  title,
  url,
}: {
  data: string
  title: string
  url: string
  next: { url: string; title: string }
  prev: { url: string; title: string }
}) => {
  useScroll([url])

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta content={title} property='og:title' />
        <meta content={url} property='og:url' />
        <meta content={url} property='canonical' />
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
}

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
  const index = section.links.findIndex(
    (link: { url: string }) => link.url === `/${slug}/${post}`,
  )

  const { title, url } = section.links[index]

  const res = await fetch(postUrl(slug, post))
  const data = await res.text()

  return {
    props: {
      data,
      title,
      url: process.env.NEXT_PUBLIC_DOMAIN + url,
    },
    revalidate: 60 * 60,
  }
}
