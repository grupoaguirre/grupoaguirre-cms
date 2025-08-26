# 🏛️ Grupo Aguirre - CMS

## 🎯 Resumen Ejecutivo

**Grupo Aguirre** implementa un **CMS headless especializado** basado en **Payload CMS** y **Next.js** con una arquitectura modular diseñada para la gestión de contenido jurídico. El sistema maneja recursos legales, blog especializado y búsqueda unificada para el sitio web.

---

## 🏗️ ARQUITECTURA DEL SISTEMA

### Stack Tecnológico

- **Backend**: Payload CMS 3.52.0 (Headless CMS)
- **Frontend**: Next.js 15.4.6 (React 19.1.0)
- **Base de Datos**: MongoDB con Mongoose
- **Almacenamiento**: AWS S3 para archivos e imágenes
- **Editor de Texto**: Lexical Rich Text Editor
- **Autenticación**: Sistema de roles personalizado
- **Lenguaje**: TypeScript 5.7.3

### Estructura del Proyecto

```
aguirre-server/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── collections/         # Colecciones de Payload CMS
│   ├── components/          # Componentes React
│   ├── utils/              # Utilidades y helpers
│   └── payload.config.ts   # Configuración principal de Payload
├── public/                  # Archivos estáticos
└── package.json            # Dependencias y scripts
```

---

## 📚 COLECCIONES DEL SISTEMA

### 🔐 **Admin Users** (`admin`)

- **Propósito**: Gestión de usuarios administradores
- **Acceso**: Solo super-admin puede crear/editar/eliminar
- **Campos**: Email (título), Rol (super-admin)
- **Autenticación**: Sistema de auth integrado

### 👥 **Authors** (`authors`)

- **Propósito**: Gestión de autores del blog
- **Campos**: Nombre del autor
- **Uso**: Relacionado con entradas del blog

### 📝 **Blog** (`blog`)

- **Propósito**: Sistema de blog especializado en contenido legal
- **Características**:
  - Editor Lexical para contenido rico
  - Conversión automática a HTML
  - Sistema de categorías y etiquetas
  - Estados: Borrador/Publicado
  - Generación automática de slugs
- **Campos Principales**:
  - Título, Resumen, Contenido
  - Autor, Categoría, Etiquetas
  - Imagen destacada, Fecha publicación
  - Estado (borrador/publicado)
- **Hooks**: Generación automática de slug

### 🏷️ **Tags** (`tags`)

- **Propósito**: Etiquetas unificadas para todo el contenido
- **Características**:
  - Generación automática de slug
  - Descripción opcional

### 🏷️ **Blog Tags** (`blogTags`)

- **Propósito**: Etiquetas específicas para el blog
- **Hooks**: Generación automática de slug

### 🏷️ **Resource Tags** (`resourceTags`)

- **Propósito**: Etiquetas específicas para recursos legales
- **Hooks**: Generación automática de slug

### 📁 **Media - Images** (`images`)

- **Propósito**: Gestión de imágenes del sistema
- **Características**:
  - Almacenamiento en AWS S3
  - Generación automática de tamaños (thumbnail, card, tablet)
  - URLs automáticas de S3
- **Tipos**: Blog, Documento
- **Hooks**: Generación de URLs de S3

### 📄 **Media - Documents** (`documents`)

- **Propósito**: Gestión de documentos PDF y archivos
- **Características**:
  - Almacenamiento en AWS S3
  - Soporte para múltiples formatos (PDF, Word, Excel, PowerPoint)
  - URLs automáticas de S3
  - Sistema de categorías y etiquetas
- **Formatos Soportados**:
  - PDF, Word (.doc, .docx)
  - Excel (.xls, .xlsx)
  - PowerPoint (.ppt, .pptx)
  - Texto plano, CSV
  - Imágenes (JPEG, PNG, GIF, WebP)
- **Hooks**: Generación de URLs de S3

### ⚖️ **Legal Resources** (`legalResources`)

- **Propósito**: Gestión de recursos legales especializados
- **Tipos de Recurso**:
  - **Documento**: PDF para descarga
  - **Artículo/Guía**: Contenido rico con editor Lexical
- **Características**:
  - Editor Lexical para artículos
  - Conversión automática a HTML
  - Sistema de categorías especializadas
  - Priorización (1-10)
  - Control de visibilidad pública
- **Categorías**:
  - Formularios, Contratos, Guías Prácticas
  - Normativas, Recursos de Emergencia, Plantillas
- **Hooks**:
  - Generación automática de slug

### 🔍 **Search Items** (`searchItems`)

- **Propósito**: Índice manual de búsqueda
- **Características**:
  - **Sistema Manual**:
  - Control total sobre qué aparece en búsquedas
  - Optimización manual para SEO
- **Tipos de Contenido**:
  - Blog, Documento, Área, Servicio
  - Recurso, Página, Noticia, Otro
- **Campos Principales**:
  - Título, Resumen, URL
  - Categoría, Etiquetas
  - Contenido para búsquedas (texto completo)
  - Prioridad (1-10), Estado activo
  - Fecha de creación automática

---

## 🌐 CONFIGURACIÓN DE ENTORNO

### Variables Requeridas

```bash
# Payload CMS
PAYLOAD_SECRET=<tu_clave_secreta>

# MongoDB
MONGODB_URI=mongodb://localhost:27017/aguirre-server

# AWS S3
AWS_ACCESS_KEY_ID=<tu_access_key>
AWS_SECRET_ACCESS_KEY=<tu_secret_key>
AWS_REGION=us-east-2
S3_BUCKET=<nombre_bucket>
S3_PREFIX_IMAGENES=storage-blog/
S3_PREFIX_DOCUMENTOS=storage-recursos/

# Server
NODE_ENV=development
PORT=3000
```

### Configuración S3

- **Imágenes**: Prefijo `storage-blog/` (optimizadas a WebP)
- **Documentos**: Prefijo `storage-recursos/` (múltiples formatos)
- **Región**: us-east-2 (configurable)
- **Bucket**: Configurable por entorno

---

## 📋 COMANDOS PRINCIPALES

### 🚀 **Desarrollo**

```bash
npm run dev              # Servidor desarrollo (puerto 3000)
npm run devsafe          # Desarrollo con cache limpio
npm run build            # Build producción optimizado
npm run start            # Servidor producción (puerto 10000)
```

### 🔧 **Generación y Mantenimiento**

```bash
npm run generate:types         # Tipos TypeScript
npm run generate:lexical       # Maps del editor Lexical
npm run generate:importmap     # ES6 modules map
npm run lint                   # Verificación de código
npm run build:test            # Build + lint sin deploy
```

---
