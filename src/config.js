const envConfig = JSON.parse(process.env.CONFIG || '{}')

const config = {
  seo: {},
  navbar: {},
  navlinks: {},
  sidebar: {},
  seed: {},
}

module.exports = { ...config, ...envConfig }
