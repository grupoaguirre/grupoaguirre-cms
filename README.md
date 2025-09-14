# Grupo Aguirre CMS

## 📋 Descripción del Proyecto

**Grupo Aguirre CMS** es un sistema de gestión de contenidos (CMS) desarrollado con **Payload CMS** y **Next.js** para la gestión integral de contenido web del Grupo Aguirre. Este proyecto permite administrar blogs, recursos legales, documentos, imágenes y otros tipos de contenido de manera eficiente y escalable.

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

- **Framework Principal**: Next.js 15.4.6
- **CMS**: Payload CMS 3.52.0
- **Base de Datos**: MongoDB (usando Mongoose)
- **Editor de Texto**: Lexical Editor
- **Almacenamiento**: AWS S3 (configuración opcional)
- **Frontend**: React 19.1.0
- **TypeScript**: 5.7.3
- **Deployment**: Render (configuración incluida)

### Estructura de Directorios

```
grupo-aguirre-cms/
├── src/
│   ├── app/                    # Aplicación Next.js
│   │   ├── (frontend)/         # Rutas del frontend público
│   │   └── (payload)/          # Panel de administración de Payload
│   ├── collections/            # Definiciones de colecciones CMS
│   │   ├── admin/              # Usuarios administradores
│   │   ├── authors/            # Autores de contenido
│   │   ├── blog/               # Artículos del blog
│   │   ├── categories/         # Categorías de contenido
│   │   ├── media/              # Gestión de archivos
│   │   ├── recursos/           # Recursos legales
│   │   ├── search/             # Funcionalidad de búsqueda
│   │   └── tags/               # Etiquetas de contenido
│   ├── components/             # Componentes reutilizables
│   ├── hooks/                  # Hooks personalizados
│   ├── utils/                  # Utilidades y helpers
│   └── payload.config.ts       # Configuración principal de Payload
├── public/                     # Archivos estáticos
└── package.json                # Dependencias y scripts
```

## 🗃️ Modelo de Datos

### Colecciones Principales

#### 1. **Blog** (`blog`)

Gestión de artículos y contenido editorial.

**Campos principales:**

- `title`: Título del artículo
- `slug`: URL amigable (auto-generado)
- `author`: Relación con la colección de autores
- `category`: Categoría del artículo
- `content`: Contenido rico usando Lexical Editor
- `excerpt`: Resumen del artículo
- `image`: Imagen destacada
- `tags`: Etiquetas múltiples
- `publishedDate`: Fecha de publicación
- `status`: Estado (publicado/borrador)

#### 2. **Recursos Legales** (`legal-resources`)

Documentos y guías legales para clientes.

**Tipos de recursos:**

- **Documentos**: PDFs descargables
- **Artículos/Guías**: Contenido web con editor rico

**Categorías disponibles:**

- Formularios
- Contratos
- Guías Prácticas
- Normativas
- Recursos de Emergencia
- Plantillas
- Otros

**Campos principales:**

- `titulo`: Título del recurso
- `tipo`: Documento o artículo
- `categoria`: Categoría del recurso
- `descripcion`: Descripción breve
- `archivo`: PDF (para documentos)
- `contenido`: Contenido rico (para artículos)
- `imagenDestacada`: Imagen representativa
- `prioridad`: Orden de importancia (1-10)
- `esPublico`: Visibilidad pública

#### 3. **Autores** (`authors`)

Gestión de autores de contenido.

#### 4. **Medios** (`images`, `documents`)

- **Imágenes**: Archivos de imagen con soporte S3
- **Documentos**: PDFs y otros documentos

#### 5. **Taxonomías**

- **Categorías** (`categories`): Organización principal del contenido
- **Etiquetas** (`tags`): Clasificación detallada y filtrado

#### 6. **Búsqueda** (`searchItems`)

Índice de búsqueda sincronizado automáticamente.

## ⚙️ Configuración del Proyecto

### Variables de Entorno Requeridas

Crear un archivo `.env.local` con las siguientes variables:

```env
# Configuración de Payload CMS
PAYLOAD_SECRET=tu-clave-secreta-muy-segura

# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/grupo-aguirre-cms
# O para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/grupo-aguirre-cms

# Configuración AWS S3 (Opcional)
S3_BUCKET=nombre-de-tu-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
S3_PREFIX_IMAGENES=storage-blog/
S3_PREFIX_DOCUMENTOS=storage-recursos/

# Configuración de entorno
NODE_ENV=development
```

### Requisitos del Sistema

- **Node.js**: ^18.20.2 || >=20.9.0
- **pnpm**: ^9 || ^10 (recomendado)
- **MongoDB**: 4.4+

## 🚀 Instalación y Desarrollo

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd grupo-aguirre-cms
```

### 2. Instalar Dependencias

```bash
# Usando pnpm (recomendado)
pnpm install

# O usando npm
npm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env.local
# Editar .env.local con tus valores
```

### 4. Iniciar en Modo Desarrollo

```bash
# Desarrollo normal
pnpm dev

# Desarrollo con limpieza de caché
pnpm devsafe
```

El servidor estará disponible en:

- **Frontend**: http://localhost:3000
- **Panel Admin**: http://localhost:3000/admin

### 5. Comandos Disponibles

```bash
# Desarrollo
pnpm dev                    # Servidor de desarrollo
pnpm devsafe               # Desarrollo con limpieza de caché

# Construcción
pnpm build                 # Construir para producción
pnpm build:test           # Construir y verificar con lint

# Generación de tipos y mapas
pnpm generate:types       # Generar tipos TypeScript
pnpm generate:importmap   # Generar mapa de importaciones
pnpm generate:lexical     # Generar tipos Lexical

# Utilidades
pnpm lint                 # Ejecutar ESLint
pnpm payload              # CLI de Payload CMS
pnpm start                # Servidor de producción (puerto 10000)
```

## 🌐 Despliegue

### Configuración para Render

El proyecto incluye un archivo `render.yaml` configurado para despliegue automático en Render:

```yaml
services:
  - type: web
    name: aguirre-server
    env: node
    plan: starter
    buildCommand: npm run build
    startCommand: npm run start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      # Agregar tus variables de entorno aquí
```

### Variables de Entorno en Producción

Configurar en tu plataforma de hosting:

1. **PAYLOAD_SECRET**: Clave secreta única y segura
2. **MONGODB_URI**: URI de conexión a MongoDB
3. **AWS S3** (opcional): Credenciales para almacenamiento en la nube
4. **NODE_ENV**: `production`

## 🔧 Características Principales

### ✨ Funcionalidades del CMS

1. **Editor Rico**: Lexical Editor para contenido avanzado
2. **Gestión de Medios**: Subida y organización de archivos
3. **Almacenamiento S3**: Integración opcional con AWS S3
4. **Búsqueda Avanzada**: Sistema de búsqueda sincronizado
5. **Multiidioma**: Soporte para español e inglés
6. **Roles de Usuario**: Control de acceso granular
7. **API GraphQL**: Consultas flexibles de datos
8. **Generación Automática de Slugs**: URLs amigables automáticas

### 🎨 Personalización

- **Logo Personalizado**: Componente de logo configurable
- **Interfaz en Español**: Localización completa
- **Temas**: Estilos personalizables con SCSS
- **Componentes Reutilizables**: Arquitectura modular

### 🔒 Seguridad

- **Autenticación**: Sistema de usuarios administradores
- **Autorización**: Control de acceso por roles
- **Validación**: Validación de datos en servidor y cliente
- **Sanitización**: Limpieza automática de contenido

## 📚 Uso del Sistema

### Acceso al Panel de Administración

1. Navegar a `/admin`
2. Iniciar sesión con credenciales de super-admin
3. Gestionar contenido desde el panel

### Creación de Contenido

#### Nuevo Artículo de Blog:

1. Ir a "Blog" → "Crear nuevo"
2. Completar título, contenido, autor y categoría
3. Agregar imagen destacada y etiquetas
4. Establecer fecha de publicación y estado

#### Nuevo Recurso Legal:

1. Ir a "Recursos Legales" → "Crear nuevo"
2. Seleccionar tipo (documento o artículo)
3. Completar información y contenido
4. Configurar visibilidad y prioridad

### API y Consultas

El sistema expone APIs REST y GraphQL:

- **REST**: `/api/[collection]`
- **GraphQL**: `/api/graphql`
- **GraphQL Playground**: `/api/graphql-playground` (desarrollo)

## 🤝 Contribuidores

### Equipo de Desarrollo

- **Harvey** - Desarrollador Principal
- **Grupo Aguirre** - Cliente y Stakeholder

### Cómo Contribuir

1. **Fork** el repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abrir** un Pull Request

### Estándares de Código

- **TypeScript**: Tipado estricto requerido
- **ESLint**: Seguir las reglas configuradas
- **Prettier**: Formateo automático de código
- **Commits**: Mensajes descriptivos en español

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto:

1. **Issues**: Crear un issue en el repositorio
2. **Documentación**: Consultar la documentación oficial de Payload CMS
3. **Comunidad**: Participar en foros de Next.js y Payload CMS

---

**Grupo Aguirre CMS** - Sistema de gestión de contenidos profesional para servicios legales.
