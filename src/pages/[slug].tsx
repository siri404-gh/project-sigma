import React, { FC } from 'react'

import { Typography } from '@mui/material'

import Center from '@/components/Center/Center'

interface IndexProps {
  firstRoute?: string
}

const Index: FC<IndexProps> = ({ firstRoute }) => (
  <Center>
    <Typography color='secondary' variant='h1'>
      {firstRoute}
    </Typography>
  </Center>
)

export const getServerSideProps = async ({ query: { slug = '' } }) => ({
  props: {
    firstRoute: slug,
  },
})

export default Index
