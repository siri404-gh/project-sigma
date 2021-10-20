import React, { Fragment } from 'react'

import { NextPage } from 'next'

const Index: NextPage = () => (
  <Fragment>
    <img
      title='blog'
      loading='lazy'
      alt='blog'
      src={'/img/vercel.svg'}
      height='175'
      width='300' />
  </Fragment>
)

export default Index
