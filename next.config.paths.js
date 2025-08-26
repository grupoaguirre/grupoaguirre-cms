import path from 'path'

export function setupWebpackPaths(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@payload-config': path.resolve(process.cwd(), 'src/payload.config.ts'),
    '@/payload.config': path.resolve(process.cwd(), 'src/payload.config.ts'),
    '@': path.resolve(process.cwd(), 'src'),
  }

  config.resolve.modules = [
    path.resolve(process.cwd(), 'src'),
    'node_modules',
    ...(config.resolve.modules || []),
  ]

  config.resolve.extensions = [
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.json',
    ...(config.resolve.extensions || []),
  ]

  return config
}
