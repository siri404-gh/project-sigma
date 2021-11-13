import React, { useEffect, Fragment } from 'react'

import { Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import BlinkingCursor from '@/components/BlinkingCursor/BlinkingCursor'
import Center from '@/components/Center/Center'
import { NavlinkType } from '@/components/Navlinks/Navlinks'
import config from '@/config'
import { fetchNavlinks } from '@/utils/fetchers'

const Index = ({
  title,
  url,
  firstRoute,
}: {
  title: string
  url: string
  firstRoute: string
}) => {
  const router = useRouter()

  useEffect(() => {
    if (firstRoute) setTimeout(() => router.push(firstRoute), 0)
  }, [firstRoute])

  return (
    <Center>
      <Head>
        <Fragment>
          <title>{title}</title>
          <meta content={title} name='og:title' />
          <meta content={url} name='og:url' />
          <meta content={url} name='canonical' />
        </Fragment>
      </Head>
      <BlinkingCursor /> &nbsp;
      <Typography color='primary'>Loading...</Typography>
    </Center>
  )
}

export const getServerSideProps = async ({ query: { slug = '' } }) => {
  const navlinks = await fetchNavlinks()
  const section = navlinks.links.find(
    (link: NavlinkType) => link.url === `/${slug}`,
  )
  if (section) {
    return {
      props: {
        title: `${section.title} | ${config.seo.title}`,
        url: process.env.NEXT_PUBLIC_DOMAIN + section.url,
        firstRoute: section.links[0].url,
      },
    }
  }
  return {
    props: {},
  }
}

export default Index
