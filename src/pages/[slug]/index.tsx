import React, { useEffect } from 'react'

import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

import BlinkingCursor from '@/components/BlinkingCursor/BlinkingCursor'
import Center from '@/components/Center/Center'
import { NavlinkType } from '@/components/Navlinks/Navlinks'
import { fetchNavlinks } from '@/utils/fetchers'

const Index = ({ firstRoute }: { firstRoute: string }) => {
  const router = useRouter()

  useEffect(() => {
    if (firstRoute) setTimeout(() => router.push(firstRoute), 0)
  }, [firstRoute])

  return (
    <Center>
      <BlinkingCursor /> &nbsp;
      <Typography color='primary'>Loading...</Typography>
    </Center>
  )
}

export const getServerSideProps = async ({ query: { slug = '' } }) => {
  const navlinks = await fetchNavlinks()
  const sublinks = navlinks.links.find(
    (link: NavlinkType) => link.url === `/${slug}`,
  )

  return {
    props: {
      firstRoute: sublinks.links[0].url,
    },
  }
}

export default Index

// export async function getStaticPaths() {
//   const navlinks = await fetchNavlinks()
//   const flatNavLinks = flatLinks(navlinks, 'links', 'url', 0)
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   const paths = getPathsSlug(flatNavLinks)

//   return {
//     paths,
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params as { slug: string }
//   const res = await fetch(postUrl(slug, 'index'))
//   const data = await res.text()
//   return {
//     props: { data },
//   }
// }
