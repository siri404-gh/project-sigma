import React from 'react'

import Image from 'next/image'

import Center from '@/components/Center/Center'

const Splash = () => (
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

export default Splash
