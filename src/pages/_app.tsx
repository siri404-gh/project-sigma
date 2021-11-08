import React, { Fragment, ReactElement, ReactNode } from 'react'

import { UserProvider } from '@auth0/nextjs-auth0'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type { NextPage } from 'next'
import type { AppProps as NextAppProps } from 'next/app'

import Layout, { LayoutProps } from '@/components/Layout/Layout'
import config from '@/config'
import theme from '@/theme'
import '@/styles/styles.css'

const layoutProps = {
  seoProps: config.seo,
  navbarProps: config.navbar,
  navlinksProps: config.navlinks,
  sidebarProps: config.sidebar,
  socialProps: config.socialLinks,
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = NextAppProps & {
  Component: NextPageWithLayout
}

const defaultLayout = (page: ReactElement, layoutProps: LayoutProps) => (
  <Layout {...layoutProps}>{page}</Layout>
)

const MyApp = ({ Component: Page }: AppPropsWithLayout) => {
  const getLayout = Page.getLayout ?? defaultLayout

  return (
    <Fragment>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Page />, layoutProps)}
        </ThemeProvider>
      </UserProvider>
    </Fragment>
  )
}

export default MyApp
