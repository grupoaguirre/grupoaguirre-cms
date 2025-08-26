'use client'

import Image from 'next/image'
import React from 'react'
import { useTheme } from '@payloadcms/ui'

export const Logo: React.FC = () => {
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? '/logo1.png' : '/logo2.png'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '300px',
        maxHeight: '100px',
      }}
    >
      <Image
        src={logoSrc}
        alt="Grupo Aguirre"
        width={300}
        height={100}
        style={{
          objectFit: 'contain',
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        priority
      />
    </div>
  )
}
