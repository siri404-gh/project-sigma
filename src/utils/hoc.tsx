import React from 'react'

import Splash from '@/components/Splash/Splash'

import { useTier } from './hooks'

type userProps = {
  // given_name?: string
  // family_name?: string
  // nickname?: string
  // name?: string
  // picture?: string
  // locale?: string
  // updated_at?: string
  // email?: string
  // email_verified?: boolean
  sub: string
  role: '0' | '1'
}

export const withElevatedPrevilegesRequired = (
  Component: () => JSX.Element,
  role: string,
) =>
  function ({ user }: { user: userProps }) {
    const [tier, isLoading] = useTier(user.sub)
    if (tier !== role && !isLoading) {
      window.location.assign('/premium')
    }
    isLoading && <Splash />
    return !isLoading && tier === role && <Component />
  }
