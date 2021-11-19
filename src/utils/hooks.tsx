// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { fetchNavlinks } from './fetchers'

export const useNavlinks = (initialVal = {}) => {
  const [navlinks, setNavlinks] = useState<any>(initialVal)

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchNavlinks()
      setNavlinks(data)
    }
    fetch()
  }, [])

  return navlinks
}

export const useProgress = () => {
  const [prev, setPrev] = useState<any>(null)
  const [next, setNext] = useState<any>(null)
  const navlinks = useNavlinks()

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
        index = section.links.findIndex(
          (link: { url: string }) => link.url === `/${newSlug}/${post}`,
        )
        setPrev(section.links[index - 1] || null)
        setNext(section.links[index + 1] || null)
      }
    }
  }, [newSlug, post, navlinks])

  return { prev, next }
}
