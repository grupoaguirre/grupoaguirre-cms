export function setupErrorHandlers() {
  process.on('uncaughtException', (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error no capturado:', error)
    }
  })

  process.on('unhandledRejection', (reason, promise) => {
    if (reason === null || reason === undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'Promesa rechazada con valor null/undefined detectada - probablemente relacionado con hooks internos de Next.js',
        )
      }
      if (promise && typeof promise.catch === 'function') {
        promise.catch(() => {})
      }
      return
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Promesa rechazada:', reason)
    }
  })

  if (process.env.NODE_ENV === 'development') {
    process.on('warning', (warning) => {
      console.warn('Advertencia:', warning.message)
    })
  }
}
