import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Districts: CollectionConfig<'districts'> = {
  slug: 'districts',
  labels: {
    singular: 'Distrito',
    plural: 'Distritos',
  },
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Imobiliário',
  },
  fields: [
    {
      label: 'Nome',
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      label: 'Propriedades',
      name: 'properties',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: true,
    },
    ...slugField('name'),
  ],
  hooks: {
    // afterChange: [revalidateConsultant],
  },
}
