import * as React from 'react';

import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';

import theme from '../theme';
import { createEmotionCache } from './_document';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface Props {
  Component: React.ComponentType
  emotionCache?: ReturnType<typeof createEmotionCache>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps?: any
}

const MyApp: React.FunctionComponent<Props> = ({ Component: Page, emotionCache = clientSideEmotionCache, pageProps }) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <title>My page</title>
      <meta name='viewport' content='viewport-fit=cover' />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Page {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
)

export default MyApp;
