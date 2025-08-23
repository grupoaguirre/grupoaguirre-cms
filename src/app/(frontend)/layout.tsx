import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Sistema de gestión de contenido del sitio web - Grupo Aguirre',
  title: 'Grupo Aguirre',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
