import React from 'react'

import { NextApiResponse } from 'next'

import Center from '@/components/Center/Center'

function Error({ statusCode }: { statusCode: number }) {
  return (
    <Center>
      {statusCode
        ? `An error of ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </Center>
  )
}

Error.getInitialProps = (res: NextApiResponse, err: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
