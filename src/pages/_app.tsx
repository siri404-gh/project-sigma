import React, { Fragment } from 'react'

import { UserProvider } from '@auth0/nextjs-auth0'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type {
  AppProps as NextAppProps,
  AppContext as NextAppContext,
} from 'next/app'

import Layout, { LayoutProps } from '@/components/Layout/Layout'
import config from '@/config'
import theme from '@/theme'
import '@/styles/styles.css'

interface MyAppProps extends NextAppProps {
  layoutProps: LayoutProps
}

const MyApp = ({ Component: Page, layoutProps, pageProps }: MyAppProps) => (
  <Fragment>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout {...layoutProps}>
          <Page {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserProvider>
  </Fragment>
)

MyApp.getInitialProps = async ({ Component, ctx }: NextAppContext) => ({
  pageProps: Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {},
  layoutProps: {
    seoProps: config.seo,
    navbarProps: config.navbar,
    navlinksProps: config.navlinks,
    sidebarProps: config.sidebar,
  },
})

export default MyApp
