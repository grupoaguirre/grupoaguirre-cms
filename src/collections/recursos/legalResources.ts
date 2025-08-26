import { CollectionConfig } from 'payload'
import { CollectionSlug } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { slugify } from '../../utils'

const LegalResources: CollectionConfig = {
  slug: 'legal-resources',
  labels: {
    singular: 'Recurso Legal',
    plural: 'Recursos Legales',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tipo', 'categoria', 'fechaPublicacion'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin',
    update: ({ req }) => req.user?.role === 'super-admin',
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'tipo',
      label: 'Tipo de Recurso',
      type: 'select',
      required: true,
      options: [
        { label: 'Documento para Descarga', value: 'documento' },
        { label: 'Artículo/Guía', value: 'articulo' },
      ],
      defaultValue: 'documento',
    },
    {
      name: 'titulo',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tags',
      label: 'Categoría principal',
      type: 'relationship',
      relationTo: 'tags' as CollectionSlug,
      hasMany: false,
      required: true,
    },
    {
      name: 'resourceTags',
      label: 'Etiquetas de recursos',
      type: 'relationship',
      relationTo: 'resourceTags' as CollectionSlug,
      hasMany: true,
      required: false,
    },
    {
      name: 'archivo',
      label: 'Documento PDF',
      type: 'upload',
      relationTo: 'documents' as CollectionSlug,
      admin: {
        condition: (data) => data.tipo === 'documento',
        description: 'Archivo PDF que se mostrará para descargar o previsualizar',
      },
    },
    {
      name: 'contenido',
      label: 'Contenido del Artículo',
      type: 'richText',
      editor: lexicalEditor(),
      admin: {
        condition: (data) => data.tipo === 'articulo',
      },
    },
    {
      name: 'contenidoHtml',
      label: 'Contenido (HTML)',
      type: 'textarea',
      admin: {
        readOnly: true,
        condition: (data) => data.tipo === 'articulo',
        description: 'Este campo se genera automáticamente del contenido del artículo',
      },
    },
    {
      name: 'imagenDestacada',
      label: 'Imagen Destacada',
      type: 'upload',
      relationTo: 'images' as CollectionSlug,
      required: true,
    },

    {
      name: 'fechaPublicacion',
      label: 'Fecha de Publicación',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'esPublico',
      label: '¿Es Público?',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Si está marcado, será visible en el sitio web',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.titulo && !data.slug) {
          data.slug = slugify(data.titulo)
        }
        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc?.tipo === 'articulo' && doc?.contenido) {
          try {
            const html = convertLexicalToHTML({
              data: doc.contenido,
            })
            doc.contenidoHtml = html
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.error('Error converting Lexical to HTML in afterRead:', error)
            }
            doc.contenidoHtml = ''
          }
        }
        return doc
      },
    ],
  },
}

export default LegalResources
