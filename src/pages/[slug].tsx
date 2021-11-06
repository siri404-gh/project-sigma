import React, { FC } from 'react'

import Markdown from '@/components/Markdown/Markdown'

interface IndexProps {
  firstRoute?: string
}

const Index: FC<IndexProps> = ({ firstRoute = '' }) => (
  <Markdown>{firstRoute}</Markdown>
)

export const getServerSideProps = async ({ query: { slug = '' } }) => ({
  props: {
    firstRoute: slug,
  },
})

export default Index
