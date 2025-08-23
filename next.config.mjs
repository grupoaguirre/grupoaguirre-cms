import { withPayload } from '@payloadcms/next/withPayload'
import { setupWebpackPaths } from './next.config.paths.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
  // Configuración de imágenes para S3
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configuración de webpack para resolver aliases
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Usar función auxiliar para configurar paths
    return setupWebpackPaths(config)
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: process.env.NODE_ENV === 'development',
})
