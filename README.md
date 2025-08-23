# 🏛️ Grupo Aguirre - Legal Platform

## 🎯 Resumen Ejecutivo

**Grupo Aguirre Legal Platform** implementa un **CMS headless especializado** basado en **Payload CMS 3.44.0** con una arquitectura modular diseñada para la gestión de contenido jurídico. El sistema maneja recursos legales, blog especializado y búsqueda unificada para el sitio web.

---

## 🏛️ 1. ARQUITECTURA GENERAL

### Patrón Arquitectónico: **Legal Content Hub**

```
┌─────────────────────────────────────────┐
│              FRONTEND                   │
│          (Next.js 15.3.0)               │
└─────────────────┬───────────────────────┘
                  │ REST API
┌─────────────────▼───────────────────────┐
│           PAYLOAD CMS 3.44.0            │
├─────────────────────────────────────────┤
│          Collections Layer              │
├─────────────────────────────────────────┤
│           Hooks Layer                   │
├─────────────────────────────────────────┤
│          Utils Layer                    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            MONGODB                      │
│         (Base de Datos)                 │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            AWS S3                       │
└─────────────────────────────────────────┘
```

---

## 📁 2. ESTRUCTURA DE PROYECTO

### Organización Legal Especializada

```
aguirre-server/
├── src/
│   ├── app/                          # Next.js Frontend
│   │   ├── (frontend)/              # Sitio público
│   │   ├── (payload)/               # Admin Panel
│   │   └── globals.css              # Estilos base
├── collections/                     # Modelos legales
│   ├── admin/                       # Usuarios del sistema
│   ├── authors/                     # Autores jurídicos
│   ├── blog/                        # Artículos legales
│   ├── categories/                  # Áreas del derecho
│   ├── media/                       # Archivos legales
│   │   ├── documents/               # PDFs jurídicos
│   │   └── images/                  # Imágenes
│   ├── recursos-legales/            # Normativas y leyes
│   ├── search-items/                # Búsqueda unificada
│   └── tags/                        # Etiquetas jurídicas
├── hooks/                           # Lógica de negocio
│   └── syncToSearch.ts              # Auto-sincronización
├── components/                      # Componentes de personalizacion
│   └── logo.tsx                     # Logo personalizado
├── utils/                           # Utilidades
│   ├── awsS3.ts                     # Cliente S3 legal
│   └── slug.ts                      # URLs amigables
└── payload.config.ts                # Configuración principal
```

---

## 🔧 3. PATRONES DE DISEÑO IMPLEMENTADOS

### 3.1 **Observer Pattern** - Auto-Sincronización

```typescript
// Sincronización automática de contenido legal
export const syncToSearch: CollectionAfterChangeHook = async ({ doc, collection }) => {
  // Auto-indexa nuevo contenido jurídico
}
```

### 3.2 **Strategy Pattern** - Tipos de Contenido

```typescript
const legalContentMap: Record<string, SearchItem['type']> = {
  blog: 'articulo-legal',
  'recursos-legales': 'normativa',
  documents: 'documento-legal',
}
```

### 3.3 **Factory Pattern** - URLs Jurídicas

```typescript
// URLs especializadas para contenido legal
if (collection?.slug === 'blog') {
  itemUrl = `/blog/${doc.slug}`
} else if (collection?.slug === 'recursos-legales') {
  itemUrl = `/recursos/${doc.categoria}/${doc.slug}`
}
```

### 3.4 **Singleton Pattern** - Cliente AWS Legal

```typescript
// Cliente único para documentos legales
export const legalS3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: { ... }
})
```

---

## 🗃️ 4. MODELO DE DATOS LEGAL

### 4.1 Arquitectura de Contenido Jurídico

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   BLOG LEGAL    │    │ RECURSOS-LEGALES│    │   DOCUMENTOS     │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼───────────────┐
                    │       SEARCH-ITEMS          │
                    │  (Índice Legal Unificado)   │
                    └─────────────────────────────┘
```

### 4.2 Relaciones Legales Principales

```typescript
// Blog Legal
BlogLegal → Author (Abogado especialista)
BlogLegal → Category (Área del derecho: Civil/Penal/Laboral)
BlogLegal → Tags (Conceptos jurídicos)

// Recursos Legales
RecursosLegales → TipoNormativa (Ley/Decreto/Resolución)
RecursosLegales → Documents (PDF oficial)
RecursosLegales → Tags (Etiquetas especializadas)

// Search Items (Auto-generado)
SearchItems → Tags (many-to-many)
SearchItems ← Blog/RecursosLegales/Documents (via originalId)
```

---

## 📝 5. CONVENCIONES Y NOMENCLATURA

```typescript
// Colecciones: kebab-case con contexto legal
;('recursos-legales', 'search-items', 'legal-categories')(
  // Campos: camelCase jurídico descriptivo
  tipoNormativa,
  fechaVigencia,
  areaPractica,
  numeroOficial,
)(
  // Archivos: camelCase con sufijo legal
  recursosLegales.ts,
  syncToSearchLegal.ts,
  legalValidation.ts,
)(
  // Tipos: PascalCase con contexto jurídico
  RecursoLegal,
  ArticuloJuridico,
  BusquedaLegal,
)
```

---

## 🔧 6. CONFIGURACIÓN DE ENTORNO

### Variables Especializadas para Sistema Legal

```bash
# Payload CMS
PAYLOAD_SECRET=genera_tu_propia_clave_secreta

# MongoDB
MONGODB_URI=mongodb://localhost:27017/aguirre-server

# AWS S3
AWS_ACCESS_KEY_ID=aws_access_key
AWS_SECRET_ACCESS_KEY=aws_secret_key
AWS_REGION=us-east-2
AWS_BUCKET=bucket_name
S3_BUCKET=bucket_s3_name
S3_ENDPOINT=https://s3.us-east-2.amazonaws.com
S3_REGION=us-east-2

# Server
NODE_ENV=development
PORT=3000
```

---

## 📋 7. COMANDOS PRINCIPALES

### Desarrollo Legal

```bash
npm run dev              # Servidor desarrollo (puerto 3000)
npm run build            # Build producción optimizado
npm run start            # Servidor producción (puerto 10000)
npm run lint             # Verificación de código
```

### Generación Automática

```bash
npm run generate:types         # Tipos TypeScript legales
npm run generate:lexical       # Rich Text Editor maps
npm run generate:importmap     # ES6 modules map
```

### Comandos Especializados

```bash
npm run build:test        # Build + lint sin deploy
npm run devsafe          # Desarrollo con cache limpio
```

---
