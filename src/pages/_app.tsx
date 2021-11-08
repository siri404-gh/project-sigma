import React, { Fragment, FC } from 'react'

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
  layout?: FC<LayoutProps>
}

type AppPropsWithLayout = NextAppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component: Page }: AppPropsWithLayout) => {
  const PageLayout = Page.layout ?? Layout

  return (
    <Fragment>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageLayout {...layoutProps}>
            <Page />
          </PageLayout>
        </ThemeProvider>
      </UserProvider>
    </Fragment>
  )
}

export default MyApp
