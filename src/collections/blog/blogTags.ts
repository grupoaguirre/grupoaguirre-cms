import { CollectionConfig } from 'payload'
import { slugify } from '../../utils'

const BlogTags: CollectionConfig = {
  slug: 'blogTags',
  labels: {
    singular: 'Etiquetas de Blog',
    plural: 'Etiquetas de Blog',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['name', 'slug'],
  },
  fields: [
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
      admin: { readOnly: true },
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
  },
}
export default BlogTags
