import React from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import Markdown from '@/components/Markdown/Markdown'
import { fetchPost } from '@/utils/fetchers'
import { withPemissionsRequired } from '@/utils/hooks'

export default ({ data }: { data: string }) => <Markdown>{data}</Markdown>

const _getServerSideProps = async ({ params }: { params: any }) => {
  const data = await fetchPost('courses', params.post)
  console.log('data', data)
  return {
    props: {
      data,
    },
  }
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: withPemissionsRequired({
    getServerSideProps: _getServerSideProps,
  }),
})
