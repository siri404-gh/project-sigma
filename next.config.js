/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const path = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const runtimeCaching = require('./src/caching')
const { seed } = require('./src/config')

const nextConfig = {
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: isServer,
              publicPath: `/_next/static/`,
              outputPath: `${isServer ? '../' : ''}static/`,
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ]
    config.plugins = [
      ...config.plugins,
      new WebpackManifestPlugin({
        fileName: path.resolve(__dirname, './public/static/manifest.json'),
        // basePath: '',
        seed,
        generate: seed => seed,
      }),
    ]

    return config
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    sw: 'service-worker.js',
    // exclude: ['/api/*'],
    buildExcludes: [/middleware-manifest.json$/],
    runtimeCaching,
  },
}

module.exports = withPlugins([withPWA], nextConfig)
