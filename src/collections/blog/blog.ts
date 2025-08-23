import { CollectionConfig } from 'payload'
import { CollectionSlug } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { syncToSearch } from '../../hooks'
import { slugify } from '../../utils'

const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: 'Artículo',
    plural: 'Blog',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin',
    update: ({ req }) => req.user?.role === 'super-admin',
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'author',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'authors' as CollectionSlug,
      required: true,
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'relationship',
      relationTo: 'categories' as CollectionSlug,
      required: true,
    },
    {
      name: 'title',
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
      name: 'excerpt',
      label: 'Resumen',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      label: 'Contenido',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: 'contentHtml',
      label: 'Contenido (HTML)',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            try {
              if (siblingData?.content) {
                return convertLexicalToHTML({
                  data: siblingData.content,
                })
              }
              return ''
            } catch (error) {
              if (process.env.NODE_ENV === 'development') {
                console.error('Error converting Lexical to HTML:', error)
              }
              return ''
            }
          },
        ],
      },
    },
    {
      name: 'image',
      label: 'Imagen destacada',
      type: 'upload',
      relationTo: 'images' as CollectionSlug,
      required: false,
    },
    {
      name: 'tags',
      label: 'Etiquetas',
      type: 'relationship',
      relationTo: 'tags' as CollectionSlug,
      hasMany: true,
    },
    {
      name: 'publishedDate',
      label: 'Fecha de publicación',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      options: [
        { label: 'Publicado', value: 'published' },
        { label: 'Borrador', value: 'draft' },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
    afterChange: [syncToSearch],
  },
}

export default Blog
