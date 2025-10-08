import type { CollectionConfig } from 'payload'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateProperty } from './hooks/revalidateProperty'
import { updateDistrict } from './hooks/updateDistrict'

export const propertyTypesMap: { [key: string]: string } = {
  apartment: 'Apartamento',
  house: 'Moradia',
  land: 'Terreno',
  comercial: 'Comercial',
  other: 'Outro',
}

export const propertyTypesNumberToKeyMap: { [key: number]: string } = {
  1: 'apartment',
  2: 'house',
  3: 'land',
  4: 'comercial',
  5: 'other',
}

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
              type: 'select',
              options: [
                {
                  label: propertyTypesMap.apartment,
                  value: 'apartment',
                },
                {
                  label: propertyTypesMap.house,
                  value: 'house',
                },
                {
                  label: propertyTypesMap.land,
                  value: 'land',
                },
                {
                  label: propertyTypesMap.comercial,
                  value: 'comercial',
                },
                {
                  label: propertyTypesMap.other,
                  value: 'other',
                },
              ],
              required: true,
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
              type: 'select',
              options: [
                {
                  label: 'Disponível',
                  value: 'available',
                },
                {
                  label: 'Vendido',
                  value: 'sold',
                },
              ],
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
              defaultValue: 0,
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
              defaultValue: 0,
            },
            {
              label: 'Lugares de Estacionamento',
              name: 'parkingSpaces',
              type: 'number',
              defaultValue: 0,
            },
            {
              label: 'Casas de Banho',
              name: 'wc',
              type: 'number',
              defaultValue: 0,
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
      ],
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
  ],
  hooks: {
    afterChange: [revalidateProperty, updateDistrict],
  },
}
