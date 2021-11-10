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
    0,
    ({ title }) => title !== 'Courses',
  )
  console.log(_flatLinks)
  const paths = _flatLinks.map(link => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [, slug] = link.split('/')
    return { params: { slug } }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const data = require(`../../data/${params?.slug}/index.md`).default
  const url = `https://raw.githubusercontent.com/sreeramofficial/blog-posts/master/${params?.slug}/index.md`
  const res = await fetch(url)
  const data = await res.text()

  return {
    props: { data },
  }
}
