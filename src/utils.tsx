import React, { useState, useEffect, createContext, ReactElement } from 'react'

import { useUser } from '@auth0/nextjs-auth0'

export const fetchData = async (custId: string) => {
  const data = await fetch(`/api/user?custId=${custId}`)
  return await data.json()
}

export const dataContext = createContext<Record<string, string> | null>(null)

export const DataProvider = ({ children }: { children: ReactElement }) => {
  const [data, setData] = useState<Record<string, string> | null>(null)
  const { user } = useUser()

  useEffect(() => {
    if (!user) {
      setData({})
    } else {
      const { sub } = user
      if (sub) {
        fetchData(sub).then(res => {
          setData({
            ...user,
            ...res,
          })
        })
      }
    }
  }, [user])

  const { Provider } = dataContext

  return <Provider value={data}>{children}</Provider>
}
