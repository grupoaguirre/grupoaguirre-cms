import type { CollectionConfig } from 'payload'

const Images: CollectionConfig = {
  slug: 'images',
  labels: { singular: 'Imagen', plural: 'Imágenes' },
  access: { read: () => true },
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    disableLocalStorage: true,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc?.filename) {
          const bucket = process.env.S3_BUCKET!
          const region = process.env.AWS_REGION || process.env.S3_REGION!
          const prefix = process.env.S3_PREFIX_IMAGENES || 'storage-blog/'
          const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`
          const filename = doc.filename.startsWith(prefix)
            ? doc.filename
            : `${prefix}${doc.filename}`
          doc.url = `${baseUrl}/${filename}`

          if (doc.sizes) {
            for (const sizeKey of Object.keys(doc.sizes)) {
              const sizeData = doc.sizes[sizeKey]
              if (sizeData?.filename) {
                const sizeFilename = sizeData.filename.startsWith(prefix)
                  ? sizeData.filename
                  : `${prefix}${sizeData.filename}`
                sizeData.url = `${baseUrl}/${sizeFilename}`
              }
            }
          }
        }
        return doc
      },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Texto alternativo', required: true },
    {
      name: 'type',
      label: 'Tipo de imagen',
      type: 'select',
      options: ['blog', 'document'],
      required: true,
    },
  ],
}

export default Images
