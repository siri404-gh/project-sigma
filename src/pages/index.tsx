import React from 'react'

import { NextPage } from 'next'
import Image from 'next/image'

import Center from '@/components/Center/Center'

const Index: NextPage = () => (
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

export default Index

export const getServerSideProps = async () => ({
  props: {},
})
