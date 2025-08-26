import { withPayload } from '@payloadcms/next/withPayload'
import { setupWebpackPaths } from './next.config.paths.js'

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    return setupWebpackPaths(config)
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: process.env.NODE_ENV === 'development',
})
