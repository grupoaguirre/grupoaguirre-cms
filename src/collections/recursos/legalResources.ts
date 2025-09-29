import { CollectionConfig } from 'payload'
import { CollectionSlug } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { syncToSearch } from '../../hooks'
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
      name: 'categoria',
      label: 'Categoría',
      type: 'select',
      required: true,
      options: [
        { label: 'Formularios', value: 'formularios' },
        { label: 'Contratos', value: 'contratos' },
        { label: 'Guías Prácticas', value: 'guias-practicas' },
        { label: 'Normativas', value: 'normativas' },
        { label: 'Recursos de Emergencia', value: 'recursos-emergencia' },
        { label: 'Plantillas', value: 'plantillas' },
        { label: 'Otros', value: 'otros' },
      ],
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
      name: 'imagenDestacada',
      label: 'Imagen Destacada',
      type: 'upload',
      relationTo: 'images' as CollectionSlug,
      required: true,
    },
    {
      name: 'tags',
      label: 'Etiquetas',
      type: 'relationship',
      relationTo: 'tags' as CollectionSlug,
      hasMany: true,
      admin: {
        description: 'Etiquetas como "urgente", "sunat", "laboral", "empresa", etc.',
      },
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
    {
      name: 'prioridad',
      label: 'Prioridad',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 10,
      admin: {
        description: 'Recursos con mayor prioridad aparecen primero (1-10)',
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
    afterChange: [syncToSearch],
  },
}

export default LegalResources
