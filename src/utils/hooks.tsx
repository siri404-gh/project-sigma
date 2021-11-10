// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect } from 'react'

import { getSession } from '@auth0/nextjs-auth0'

import { fetchNavlinks, fetchUserData } from './fetchers'

export const withPemissionsRequired = ({ getServerSideProps }) =>
  async function ({ req, res, ...rest }) {
    const session = getSession(req, res)
    const { tier } = await fetchUserData(session?.user.sub)
    console.log('tier', tier)
    if (tier !== '1')
      return {
        redirect: {
          destination: '/premium',
          permanent: false,
        },
      }
    return await getServerSideProps({ req, res, ...rest })
  }

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
