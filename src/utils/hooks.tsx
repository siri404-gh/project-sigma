import { useState, useEffect } from 'react'

import { fetchData } from './dataProvider'

export const useTier = (custId: string) => {
  const [tier, setTier] = useState<string>('0')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchTier() {
      const { tier } = await fetchData(custId)
      setTier(tier)
      setIsLoading(false)
    }
    fetchTier()
  }, [custId])
  return [tier, isLoading] as const
}

export const withPemissionsRequired = async (custId: string, role = '1') => {
  if (!custId) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    }
  }
  const { tier } = await fetchData(custId)
  if (tier !== role) {
    return {
      redirect: {
        destination: '/premium',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

export const getNavlinks = async () => {
  const url =
    'https://raw.githubusercontent.com/sreeramofficial/blog-posts/master/links.json'
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const useNavlinks = (initialVal = {}) => {
  const [navlinks, setNavlinks] = useState<any>(initialVal)

  useEffect(() => {
    const fetch = async () => {
      const data = await getNavlinks()
      setNavlinks(data)
    }
    fetch()
  }, [])

  return navlinks
}
