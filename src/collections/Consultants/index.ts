import type { CollectionConfig } from 'payload'
import { revalidateConsultant } from './hooks/revalidateConsultant'

import { slugField } from '@/fields/slug'

export const Consultants: CollectionConfig<'consultants'> = {
  slug: 'consultants',
  labels: {
    singular: 'Consultor',
    plural: 'Consultores',
  },
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Imobiliário',
  },
  fields: [
    {
      label: 'ID Externo',
      name: 'externalId',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      label: 'Nome do/a Consultor(a)',
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: 'E-mail do/a Consultor(a)',
      name: 'email',
      type: 'text',
    },
    {
      label: 'Telefone do/a Consultor(a)',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'URL da Imagem',
      name: 'imageUrl',
      type: 'text',
    },
    {
      label: 'Breve descrição',
      name: 'description',
      type: 'text',
    },
    ...slugField('name'),
  ],
  hooks: {
    afterChange: [revalidateConsultant],
  },
}
