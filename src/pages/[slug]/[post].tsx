import React from 'react'

import { GetStaticProps } from 'next'

import Markdown from '@/components/Markdown/Markdown'
import config from '@/config'
import { flatLinks } from '@/utils/helpers'

export default ({ data }: { data: string }) => <Markdown>{data}</Markdown>

export async function getStaticPaths() {
  const _flatLinks = flatLinks(
    config.navlinks,
    'links',
    'url',
    1,
    ({ title }) => title !== 'Courses',
  )

  console.log(_flatLinks)
  const paths = _flatLinks.map(link => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [, slug, post] = link.split('/')
    return { params: { slug, post } }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const data = require(`../../data/${params?.slug}/${params?.post}.md`).default
  const url = `https://raw.githubusercontent.com/sreeramofficial/blog-posts/master/${params?.slug}/${params?.post}.md`
  const res = await fetch(url)
  const data = await res.text()
  return {
    props: { data },
  }
}
