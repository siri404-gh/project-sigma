import React, { FC } from 'react'

import { Box } from '@mui/material'
import { styled } from '@mui/system'

import Markdown from '@/components/Markdown/Markdown'

interface IndexProps {
  firstRoute?: string
}

const RelativeBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 56,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'scroll',
  [theme.breakpoints.up('sm')]: {
    top: 64,
  },
}))

const ContentBox = styled(Box)(({ theme }) => ({
  minHeight: 'fill-available',
  maxWidth: 900,
  padding: 15,
  margin: '0 auto 20px',
  [theme.breakpoints.up('md')]: {
    borderRadius: 8,
    border: 'solid 1px #2a2a2a',
  },
  backgroundImage: "url('/img/bg/trans.png')",
}))

const Index: FC<IndexProps> = ({ firstRoute = '' }) => (
  <RelativeBox>
    <ContentBox>
      <Markdown>{firstRoute}</Markdown>
    </ContentBox>
  </RelativeBox>
)

export const getServerSideProps = async ({ query: { slug = '' } }) => ({
  props: {
    firstRoute: slug,
  },
})

export default Index
