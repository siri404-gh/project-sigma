const envConfig = JSON.parse(process.env.NEXT_PUBLIC_CONFIG || '{}')

const config = {
  seo: {},
  navbar: {},
  navlinks: {},
  sidebar: {},
  seed: {},
}

module.exports = { ...config, ...envConfig }
