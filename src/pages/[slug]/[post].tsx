import React from 'react'

import { GetStaticProps } from 'next'

import Markdown from '@/components/Markdown/Markdown'
import { fetchPost, fetchNavlinks } from '@/utils/fetchers'
import { flattenNavlinks2, getPaths2 } from '@/utils/helpers'

export default ({ data }: { data: string }) => <Markdown>{data}</Markdown>

export async function getStaticPaths() {
  const navlinks = await fetchNavlinks()
  const _flatLinks = flattenNavlinks2(navlinks, 1)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paths = getPaths2(_flatLinks)
  console.log(paths)
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let data

  if (params?.slug && params?.post) {
    data = await fetchPost(params.slug.toString(), params.post.toString())
  }

  return {
    props: { data },
  }
}
