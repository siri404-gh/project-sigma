import React, { Fragment } from 'react'

import { NextPage } from 'next'

import NavBar from '@/components/NavBar'

const Index: NextPage = () => (
  <Fragment>
    <NavBar title='Web of thoughts' description='Some tagline here' />
  </Fragment>
)

export default Index
