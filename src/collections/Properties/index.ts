import type { CollectionConfig } from 'payload'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { revalidateProperty } from './hooks/revalidateProperty'
import { updateDistrict } from './hooks/updateDistrict'

export const Properties: CollectionConfig<'properties'> = {
  labels: {
    singular: 'Imóvel',
    plural: 'Imóveis',
  },
  slug: 'properties',
  admin: {
    group: 'Imobiliário',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'properties',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'properties',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              label: 'ID Externo',
              name: 'externalId',
              type: 'text',
              required: true,
              unique: true,
            },
            {
              label: 'Referência',
              name: 'reference',
              type: 'text',
              required: true,
              unique: true,
            },
            {
              label: 'Tipo de Imóvel',
              name: 'propertyType',
              type: 'text',
            },
            {
              label: 'Tipo de Negócio',
              name: 'transactionType',
              type: 'select',
              options: [
                {
                  label: 'Venda',
                  value: 'sale',
                },
                {
                  label: 'Arrendamento',
                  value: 'rent',
                },
              ],
              required: true,
            },
            {
              label: 'Condição',
              name: 'status',
              type: 'text',
            },
            {
              label: 'Disponibilidade',
              name: 'availability',
              type: 'text',
            },
            {
              label: 'Preço',
              name: 'price',
              type: 'text',
            },
            {
              label: 'Preço Visível',
              name: 'priceVisible',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              label: 'Área Útil',
              name: 'usableArea',
              type: 'text',
            },
            {
              label: 'Área Bruta',
              name: 'grossArea',
              type: 'text',
            },
            {
              label: 'Área Terreno',
              name: 'landArea',
              type: 'text',
            },
            {
              label: 'Quartos',
              name: 'bedrooms',
              type: 'number',
            },
            {
              label: 'Garagens',
              name: 'garages',
              type: 'number',
            },
            {
              label: 'Casas de Banho',
              name: 'wc',
              type: 'number',
            },
            {
              label: 'Ano de Construção',
              name: 'year',
              type: 'number',
            },
            {
              label: 'Certificado Energético',
              name: 'energyCertificate',
              type: 'text',
            },
            {
              label: 'Distrito',
              name: 'district',
              type: 'text',
            },
            {
              label: 'Concelho',
              name: 'county',
              type: 'text',
            },
            {
              label: 'Freguesia',
              name: 'parish',
              type: 'text',
            },
            {
              label: 'Morada',
              name: 'address',
              type: 'text',
            },
            {
              label: 'Código Postal',
              name: 'postalCode',
              type: 'text',
            },
            {
              label: 'Localidade',
              name: 'location',
              type: 'text',
            },
            {
              label: 'Latitude',
              name: 'latitude',
              type: 'text',
            },
            {
              label: 'Longitude',
              name: 'longitude',
              type: 'text',
            },
            {
              label: 'Imagens',
              name: 'imageUrls',
              type: 'array',
              maxRows: 20,
              fields: [
                {
                  name: 'imageUrl',
                  type: 'text',
                },
              ],
            },
            {
              label: 'Vídeo',
              name: 'videoUrl',
              type: 'text',
            },
            {
              label: 'Tour Virtual',
              name: 'virtualTourUrl',
              type: 'text',
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      label: 'Destaque',
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      label: 'Novidade',
      name: 'isNew',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      label: 'Consultor',
      name: 'consultant',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: false,
      relationTo: 'consultants',
    },

    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateProperty, updateDistrict],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 10,
  },
}
