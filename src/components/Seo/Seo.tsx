import React, { FC } from 'react'

import Head from 'next/head'

export interface SEOProps {
  author?: string
  description?: string
  domain?: string
  gtmId?: string
  keywords?: string
  ogImage?: string
  ogImageAlt?: string
  ogSiteName?: string
  ogType?: string
  ogUrl?: string
  themeColor?: string
  title?: string
  twitterId?: string
  viewport?: string
}

const Seo: FC<SEOProps> = ({
  author,
  description,
  domain,
  gtmId,
  keywords,
  ogImage,
  ogImageAlt,
  ogSiteName,
  ogType,
  ogUrl,
  themeColor,
  title,
  twitterId,
  viewport,
}) => (
  <Head>
    <title>{title}</title>
    <meta charSet='UTF-8' />
    <meta content={themeColor} name='theme-color' />
    <meta content={author} name='author' />
    <meta content={keywords} name='keywords' />
    <meta content={description} name='description' />
    <meta content={ogSiteName} property='og:site_name' />
    <meta content={title} property='og:title' />
    <meta content={description} property='og:description' />
    <meta content={ogUrl} property='og:url' />
    <meta content={ogImage} property='og:image' />
    <meta content={ogImageAlt} property='og:image:alt' />
    <meta content={ogType} property='og:type' />
    <meta content={description} name='twitter:card' />
    <meta content={domain} name='twitter:url' />
    <meta content={title} name='twitter:title' />
    <meta content={description} name='twitter:description' />
    <meta content={`${domain}/img/icon-192.png`} name='twitter:image' />
    <meta content={twitterId} name='twitter:creator' />
    <meta content={viewport} name='viewport' />
    <meta content='index,follow' name='robots' />
    <meta content={process.env.NODE_ENV} name='node-env' />
    <link href='/img/favicon.ico' rel='icon' />
    <link href='/img/icon-192.png' rel='apple-touch-icon' />
    <link href={ogUrl} rel='canonical' />
    <link href='/static/manifest.json' rel='manifest' />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = [{ event: 'gtm.js', 'gtm.start': new Date().getTime() }]`,
      }}></script>
    {process.env.NODE_ENV === 'production' && gtmId && (
      <script
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        async></script>
    )}
  </Head>
)

export default Seo
