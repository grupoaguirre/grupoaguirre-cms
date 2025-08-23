// next.config.paths.js
import path from 'path'

export function setupWebpackPaths(config) {
  // Configurar aliases absolutos para resolver imports
  config.resolve.alias = {
    ...config.resolve.alias,
    '@payload-config': path.resolve(process.cwd(), 'src/payload.config.ts'),
    '@/payload.config': path.resolve(process.cwd(), 'src/payload.config.ts'),
    '@': path.resolve(process.cwd(), 'src'),
  }
  
  // Asegurar que los módulos se resuelvan correctamente
  config.resolve.modules = [
    path.resolve(process.cwd(), 'src'),
    'node_modules',
    ...(config.resolve.modules || [])
  ]
  
  // Configurar extensiones de archivo
  config.resolve.extensions = [
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.json',
    ...(config.resolve.extensions || [])
  ]
  
  return config
} 