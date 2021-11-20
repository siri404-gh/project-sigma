import React, { useEffect, Fragment } from 'react'

import { CircularProgress } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Center from '@/components/Center/Center'
import { NavlinkType } from '@/components/Navlinks/Navlinks'
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
    if (firstRoute) {
      const timer = setTimeout(() => router.push(firstRoute), 400)
      return () => clearTimeout(timer)
    }
  }, [firstRoute])

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta content={title} name='og:title' />
        <meta content={url} name='og:url' />
        <meta content={url} name='canonical' />
      </Head>
      <Center>
        <CircularProgress />
      </Center>
    </Fragment>
  )
}

export const getServerSideProps = async ({ query: { slug = '' } }) => {
  const navlinks = await fetchNavlinks()
  const section = navlinks.links.find(
    (link: NavlinkType) => link.url === `/${slug}`,
  )
  if (section) {
    return {
      redirect: {
        destination: section.links[0].url,
        permanent: false,
      },
      // props: {
      //   title: `${section.title} | ${config.seo.title}`,
      //   url: process.env.NEXT_PUBLIC_DOMAIN + section.url,
      //   firstRoute: section.links[0].url,
      // },
    }
  }
  return {
    props: {},
  }
}

export default Index
