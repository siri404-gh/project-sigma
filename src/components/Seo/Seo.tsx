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

type TagType = {
  as: string
  args: any
  show: boolean
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
}) => {
  const tags: TagType[] = [
    {
      as: 'title',
      args: {
        children: title,
      },
      show: !!title,
    },
    {
      as: 'meta',
      args: {
        charSet: 'UTF-8',
      },
      show: true,
    },
    {
      as: 'meta',
      args: {
        name: 'theme-color',
        content: themeColor,
      },
      show: !!themeColor,
    },
    {
      as: 'meta',
      args: {
        name: 'author',
        content: author,
      },
      show: !!author,
    },
    {
      as: 'meta',
      args: {
        name: 'keywords',
        content: keywords,
      },
      show: !!keywords,
    },
    {
      as: 'meta',
      args: {
        name: 'description',
        content: description,
      },
      show: !!description,
    },
    {
      as: 'meta',
      args: {
        name: 'og:site_name',
        content: ogSiteName,
      },
      show: !!ogSiteName,
    },
    {
      as: 'meta',
      args: {
        name: 'og:title',
        content: title,
      },
      show: !!title,
    },
    {
      as: 'meta',
      args: {
        name: 'og:description',
        content: description,
      },
      show: !!description,
    },
    {
      as: 'meta',
      args: {
        name: 'og:url',
        content: ogUrl,
      },
      show: !!ogUrl,
    },
    {
      as: 'meta',
      args: {
        name: 'og:image',
        content: ogImage,
      },
      show: !!ogImage,
    },
    {
      as: 'meta',
      args: {
        name: 'og:image:alt',
        content: ogImageAlt,
      },
      show: !!ogImageAlt,
    },
    {
      as: 'meta',
      args: {
        name: 'og:type',
        content: ogType,
      },
      show: !!ogType,
    },
    // {
    //   as: 'meta',
    //   args: {
    //     name: 'twitter:card',
    //     content: ogType,
    //   },
    //   show: !!ogType,
    // },
    // {
    //   as: 'meta',
    //   args: {
    //     name: 'twitter:title',
    //     content: title,
    //   },
    //   show: !!title,
    // },
    // {
    //   as: 'meta',
    //   args: {
    //     name: 'twitter:description',
    //     content: description,
    //   },
    //   show: !!description,
    // },
    // {
    //   as: 'meta',
    //   args: {
    //     name: 'twitter:image',
    //     content: ogImage,
    //   },
    //   show: !!ogImage,
    // },
    // {
    //   as: 'meta',
    //   args: {
    //     name: 'twitter:image:alt',
    //     content: ogImageAlt,
    //   },
    //   show: !!ogImageAlt,
    // },
    {
      as: 'meta',
      args: {
        name: 'twitter:creator',
        content: twitterId,
      },
      show: !!twitterId,
    },
    {
      as: 'meta',
      args: {
        name: 'viewport',
        content: viewport,
      },
      show: !!viewport,
    },
    {
      as: 'meta',
      args: {
        name: 'robots',
        content: 'index,follow',
      },
      show: true,
    },
    {
      as: 'meta',
      args: {
        name: 'node-env',
        content: process.env.NODE_ENV,
      },
      show: true,
    },
    {
      as: 'link',
      args: {
        href: '/img/favicon.ico',
        rel: 'icon',
      },
      show: true,
    },
    {
      as: 'link',
      args: {
        href: '/img/icon-192.png',
        rel: 'apple-touch-icon',
      },
      show: true,
    },
    {
      as: 'link',
      args: {
        href: ogUrl,
        rel: 'canonical',
      },
      show: !!ogUrl,
    },
    {
      as: 'link',
      args: {
        href: '/manifest.json',
        rel: 'manifest',
      },
      show: true,
    },
    {
      as: 'script',
      args: {
        dangerouslySetInnerHTML: {
          __html: `
            window.dataLayer = [{ event: 'gtm.js', 'gtm.start': new Date().getTime() }];
          `,
        },
      },
      show: true,
    },
    {
      as: 'script',
      args: {
        src: 'https://www.googletagmanager.com/gtag/js?id=' + gtmId,
        async: 'true',
      },
      show: !!gtmId,
    },
  ]

  return (
    <Head>
      {tags.map((tag, index) => (
        <React.Fragment key={index}>
          {tag.show && <tag.as {...tag.args} />}
        </React.Fragment>
      ))}
    </Head>
  )
}

export default Seo
