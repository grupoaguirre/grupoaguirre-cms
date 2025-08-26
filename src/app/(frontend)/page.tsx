import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

const DynamicLogo = () => {
  return (
    <picture>
      <source srcSet="/logo1.png" media="(prefers-color-scheme: dark)" />
      <source srcSet="/logo2.png" media="(prefers-color-scheme: light)" />
      <Image
        alt="Grupo Aguirre Logo"
        height={150}
        src="/logo2.png"
        width={150}
        style={{ objectFit: 'contain' }}
      />
    </picture>
  )
}

export default async function HomePage() {
  try {
    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    let user = null
    try {
      const authResult = await payload.auth({ headers })
      user = authResult?.user || null
    } catch (authError) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Error durante la autenticación:', authError)
      }
    }

    return (
      <div className="home">
        <div className="content">
          <DynamicLogo />
          {!user && <h2>Bienvenido a la Plataforma de Grupo Aguirre</h2>}
          {user && <h2>Bienvenido de vuelta, {user.email}</h2>}
          <p>Sistema de gestión de contenido legal especializado</p>
          <div className="links">
            <a
              className="admin"
              href={payloadConfig.routes.admin}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ir al panel administrativo
            </a>
          </div>
        </div>
        <div className="footer">
          <p>© Grupo Aguirre - Todos los derechos reservados 2025</p>
        </div>
      </div>
    )
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error en HomePage:', error)
    }
    return (
      <div className="home">
        <div className="content">
          <DynamicLogo />
          <h2>Bienvenido a la Plataforma de Grupo Aguirre</h2>
          <p>Sistema de gestión de contenido legal especializado</p>
          <div className="links">
            <a className="admin" href="/admin" rel="noopener noreferrer" target="_blank">
              Ir al panel administrativo
            </a>
          </div>
        </div>
        <div className="footer">
          <p>© Grupo Aguirre - Todos los derechos reservados 2025</p>
        </div>
      </div>
    )
  }
}
