import React from 'react'

import { GetStaticProps } from 'next'

import Markdown from '@/components/Markdown/Markdown'
import { postUrl, fetchNavlinks } from '@/utils/fetchers'
import { flatLinks, getPathsSlug } from '@/utils/helpers'

export default ({ data }: { data: string }) => <Markdown>{data}</Markdown>

export async function getStaticPaths() {
  const navlinks = await fetchNavlinks()
  const flatNavLinks = flatLinks(navlinks, 'links', 'url', 0)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paths = getPathsSlug(flatNavLinks)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const res = await fetch(postUrl(slug, 'index'))
  const data = await res.text()
  return {
    props: { data },
  }
}
