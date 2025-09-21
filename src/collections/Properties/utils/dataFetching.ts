import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'
import { SortOptionsType } from '@/app/(frontend)/imoveis/[[...slug]]/page'
import { Property } from '@/payload-types'

export const fetchPropertyBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })

    const property = await payload.find({
      collection: 'properties',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
    })

    return property
  },
  ['property-by-slug'],
  {
    tags: ['properties'],
  },
)

export const fetchProperties = unstable_cache(
  async (
    transactionType: string = '',
    location: string = '',
    minBedrooms: number = -1,
    minWc: number = -1,
    minGarage: number = -1,
    sort: SortOptionsType = 'maisRecentes',
    page: number = 1,
  ) => {
    const payload = await getPayload({ config })

    const where: Where = {}

    if (transactionType) {
      where.transactionType = { equals: transactionType === 'arrendar' ? 'rent' : 'sale' }
    }

    if (location) {
      where.or = [
        {
          district: {
            contains: location,
          },
        },
        {
          county: {
            contains: location,
          },
        },
        {
          parish: {
            contains: location,
          },
        },
        {
          address: {
            contains: location,
          },
        },
        {
          location: {
            contains: location,
          },
        },
        {
          postalCode: {
            contains: location,
          },
        },
      ]
    }

    if (minBedrooms >= 0) {
      where.bedrooms = { greater_than_equal: minBedrooms }
    }

    if (minWc >= 0) {
      where.wc = { greater_than_equal: minWc }
    }

    if (minGarage >= 0) {
      where.garages = { greater_than_equal: minGarage }
    }

    let sortOption = '-createdAt' // Default sort
    switch (sort) {
      case 'precoAsc':
        sortOption = 'price'
        break
      case 'precoDesc':
        sortOption = '-price'
        break
      case 'areaAsc':
        sortOption = 'usableArea'
        break
      case 'areaDesc':
        sortOption = '-usableArea'
        break
    }

    const properties = await payload.find({
      collection: 'properties',
      depth: 1,
      where,
      sort: [sortOption],
      limit: 20,
      page,
    })

    return properties
  },
  ['properties'],
  {
    tags: ['properties'],
  },
)
