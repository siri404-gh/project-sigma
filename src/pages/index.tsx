import React from 'react'

import { NextPage } from 'next'
import Image from 'next/image'

import Center from '@/components/Center/Center'

const Index: NextPage = () => (
  <Center className='animate-up-down'>
    <Image
      alt='blog'
      height='175'
      loading='lazy'
      src='/img/sections/dev.svg'
      title='blog'
      width='300'
    />
  </Center>
)

export default Index
