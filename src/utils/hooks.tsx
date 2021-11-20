// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { fetchNavlinks } from './fetchers'

export const useNavlinks = (initialVal = {}) => {
  // console.log('useNavlinks')

  const [navlinks, setNavlinks] = useState<any>(initialVal)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchNavlinks()
        // console.log('useNavlinks setting state')
        setNavlinks(res)
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [])

  return navlinks
}

export const useProgress = navlinks => {
  // console.log('useProgress', navlinks)
  const [progress, setProgress] = useState<any>([null, null])

  const router = useRouter()
  const {
    route,
    query: { slug, post },
  } = router

  let newSlug = slug
  if (route.indexOf('interview') > -1) {
    newSlug = 'interview'
  }

  useEffect(() => {
    if (!navlinks.links) return
    if (newSlug) {
      const section = navlinks.links.find(
        (link: { url: string }) => link.url === `/${newSlug}`,
      )
      let index
      if (post) {
        index = section?.links.findIndex(
          (link: { url: string }) => link.url === `/${newSlug}/${post}`,
        )
        // console.log('useProgress setting state 1')
        setProgress([
          section?.links[index - 1] || null,
          section?.links[index + 1] || null,
        ])
      }
    } else {
      // console.log('useProgress setting state 2')
      setProgress([null, null])
    }
  }, [newSlug, post, navlinks])

  return progress
}
