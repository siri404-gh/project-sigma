import React from 'react'

import { NextPage } from 'next'
import Image from 'next/image'

const Index: NextPage = () => (
  <div className='animate-up-down' style={{ margin: 'auto' }}>
    <Image
      alt='blog'
      height='175'
      loading='lazy'
      src={'/img/sections/dev.svg'}
      title='blog'
      width='300'
    />
  </div>
)

export default Index
