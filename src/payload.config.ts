import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import {
  AdminUsers,
  Blog,
  Authors,
  images,
  documents,
  searchItems,
  Tags,
  Categories,
  legalResources,
} from './collections'
import { setupErrorHandlers } from './app/error-handler'
import { es } from '@payloadcms/translations/languages/es'

setupErrorHandlers()

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const s3Bucket = process.env.S3_BUCKET
const s3Region = process.env.AWS_REGION || process.env.S3_REGION
const s3AccessKeyId = process.env.AWS_ACCESS_KEY_ID
const s3SecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const s3PrefixImagenes = process.env.S3_PREFIX_IMAGENES || 'storage-blog/'
const s3PrefixDocumentos = process.env.S3_PREFIX_DOCUMENTOS || 'storage-recursos/'
const isS3Configured = s3Bucket && s3Region && s3AccessKeyId && s3SecretAccessKey

export default buildConfig({
  sharp,
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: { es },
  },
  admin: {
    user: AdminUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Grupo Aguirre',
    },
    components: {
      graphics: {
        Logo: {
          path: 'src/components/logo#Logo',
        },
      },
    },
  },
  localization: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    fallback: true,
  },
  collections: [
    AdminUsers,
    images,
    documents,
    Blog,
    Authors,
    searchItems,
    Tags,
    Categories,
    legalResources,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),

  plugins: [
    ...(isS3Configured
      ? [
          s3Storage({
            collections: {
              images: {
                prefix: s3PrefixImagenes,
              },
              documents: {
                prefix: s3PrefixDocumentos,
              },
            },
            bucket: s3Bucket,
            config: {
              region: s3Region,
              credentials: {
                accessKeyId: s3AccessKeyId,
                secretAccessKey: s3SecretAccessKey,
              },
            },
          }),
        ]
      : []),
  ],
})
