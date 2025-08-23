import { CollectionConfig } from 'payload'

const AdminUsers: CollectionConfig = {
  slug: 'admin',
  labels: {
    singular: 'Administrador',
    plural: 'Administradores',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin',
    update: ({ req }) => req.user?.role === 'super-admin',
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['super-admin'],
      required: true,
      defaultValue: 'super-admin',
    },
  ],
}

export default AdminUsers
