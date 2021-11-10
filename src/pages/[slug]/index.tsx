import React from 'react'

import { GetStaticProps } from 'next'

import Markdown from '@/components/Markdown/Markdown'
import { flattenNavlinks, getPost, getPaths1 } from '@/utils/helpers'
import { getNavlinks } from '@/utils/hooks'

export default ({ data }: { data: string }) => <Markdown>{data}</Markdown>

export async function getStaticPaths() {
  const navlinks = await getNavlinks()
  const _flatLinks = flattenNavlinks(navlinks)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paths = getPaths1(_flatLinks)
  console.log(paths)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let data

  if (params?.slug) {
    data = await getPost(params.slug.toString())
  }

  return {
    props: { data },
  }
}
