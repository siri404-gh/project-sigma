/* eslint-disable camelcase */
const envConfig = JSON.parse(process.env.NEXT_PUBLIC_CONFIG || '{}')

const config = {
  seo: {
    author: 'Author',
    description: 'description',
    domain: 'http://localhost:3001',
    gtmId: '',
    keywords: '',
    ogImage: 'http://localhost:3001/img/og_image.jpg',
    ogImageAlt: 'Title',
    ogSiteName: 'Title',
    ogType: 'website',
    ogUrl: 'http://localhost:3001',
    themeColor: '#000000',
    title: 'My Next App',
    twitterId: '',
    viewport:
      'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
  },
  seed: {
    short_name: 'shortname',
    name: 'shortname',
    start_url: '/',
    scope: '/',
    background_color: '#000000',
    display: 'fullscreen',
    description: "Title's app.",
    theme_color: '#000000',
    icons: [
      {
        src: '/img/icon-22.png',
        type: 'image/png',
        sizes: '22x22',
      },
      {
        src: '/img/icon-32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: '/img/icon-64.png',
        type: 'image/png',
        sizes: '64x64',
      },
      {
        src: '/img/icon-100.png',
        type: 'image/png',
        sizes: '100x100',
      },
      {
        src: '/img/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: '/img/maskable_icon.png',
        sizes: '196x196',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  navbar: {
    title: 'Sreeram Padmanabhan',
  },
  sidebar: {
    title: 'Sidebar',
  },
  navlinks: {
    links: [
      {
        title: 'About',
        url: '/about',
      },
    ],
  },
  socialLinks: {
    links: [
      {
        name: 'Author LinkedIn',
        icon: 'linkedin',
        url: 'https://linkedin.com',
      },
    ],
  },
}
console.log('====', process.env.NEXT_PUBLIC_CONFIG)
module.exports = { ...config, ...envConfig }
