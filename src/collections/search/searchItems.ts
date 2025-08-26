import { CollectionConfig, CollectionSlug } from 'payload'

const SearchItems: CollectionConfig = {
  slug: 'search-items',
  labels: {
    singular: 'Ítem de Búsqueda',
    plural: 'Ítems de Búsqueda',
  },
  admin: {
    useAsTitle: 'title',
    description:
      'Índice manual de búsqueda. Agrega contenido que quieras que aparezca en las búsquedas.',
    defaultColumns: ['title', 'type', 'category', 'isActive', 'priority'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin',
    update: ({ req }) => req.user?.role === 'super-admin',
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'type',
      label: 'Tipo de Contenido',
      type: 'select',
      required: true,
      options: [
        { label: 'Áreas', value: 'areas' },
        { label: 'Servicios', value: 'services' },
        { label: 'Nosotros', value: 'about' },
        { label: 'Contacto', value: 'contact' },
        { label: 'Otro', value: 'other' },
      ],
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Resumen',
      type: 'textarea',
      required: true,
    },
    {
      name: 'url',
      label: 'Enlace al Contenido',
      type: 'text',
      required: true,
      admin: {
        description: 'URL completa o ruta relativa al contenido',
      },
    },

    {
      name: 'tags',
      label: 'Categoria principal',
      type: 'relationship',
      relationTo: 'tags' as CollectionSlug,
      hasMany: true,
    },
    {
      name: 'searchContent',
      label: 'Contenido para Búsquedas',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Texto completo que se usará para las búsquedas. Incluye palabras clave importantes.',
      },
    },
    {
      name: 'priority',
      label: 'Prioridad de Búsqueda',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 10,
      admin: {
        description:
          'Número del 1 al 10. Los números más altos aparecen primero en los resultados.',
      },
    },
    {
      name: 'isActive',
      label: 'Activo en Búsquedas',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Si está marcado, aparecerá en los resultados de búsqueda',
      },
    },
    {
      name: 'fechaCreacion',
      label: 'Fecha de Creación',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default SearchItems
