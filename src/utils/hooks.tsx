// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect } from 'react'

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
