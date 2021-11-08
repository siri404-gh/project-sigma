import React from 'react'

import Image from 'next/image'

import Center from '@/components/Center/Center'
import Layout from '@/components/Layout/Layout'

const Index = () => (
  <Center>
    <div className='animate-up-down'>
      <Image
        alt='blog'
        height='175'
        loading='lazy'
        src='/img/sections/about.svg'
        title='blog'
        width='300'
      />
    </div>
  </Center>
)

Index.layout = Layout

export default Index
