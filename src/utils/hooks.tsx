import { useState, useEffect } from 'react'

import { Session } from '@auth0/nextjs-auth0'

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

export const withPemissionsRequired = async (session: Session, role = '1') => {
  const { tier } = await fetchData(session.user?.sub)
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
