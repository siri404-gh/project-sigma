import React, { Fragment } from 'react'

import { NextPage } from 'next'

import NavBar from '@/components/NavBar'

const Index: NextPage = () => (
  <Fragment>
    <NavBar
      description='Software Engineer @ Bumble Inc.'
      title='Sreeram Padmanabhan'
    />
  </Fragment>
)

export default Index
