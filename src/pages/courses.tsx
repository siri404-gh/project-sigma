import React from 'react'

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'

import { withPemissionsRequired } from '@/utils/hooks'

export default () => <div>Content</div>

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const session = getSession(req, res)
    return await withPemissionsRequired(session!)
  },
})
