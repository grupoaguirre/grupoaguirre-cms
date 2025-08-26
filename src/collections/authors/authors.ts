import { CollectionConfig } from 'payload'

const Authors: CollectionConfig = {
  slug: 'authors',
  labels: {
    singular: 'Autor',
    plural: 'Autores',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
  ],
}

export default Authors
