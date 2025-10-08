import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'
import { SortOptionsType } from '@/app/(frontend)/imoveis/[[...slug]]/page'

export const fetchPropertyByReference = unstable_cache(
  async (reference: string) => {
    const payload = await getPayload({ config })

    const property = await payload.find({
      collection: 'properties',
      where: {
        reference: {
          equals: reference,
        },
      },
      depth: 2,
    })

    return property
  },
  ['property-by-reference'],
  {
    tags: ['properties'],
  },
)

export const fetchFeaturedProperties = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const properties = await payload.find({
      collection: 'properties',
      where: {
        isFeatured: {
          equals: true,
        },
      },
      sort: ['-createdAt'],
      limit: 6,
      depth: 1,
    })

    return properties
  },
  ['featured-properties'],
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
    minParkingSpaces: number = -1,
    sort: SortOptionsType = 'maisRecentes',
    page: number = 1,
    propertyType: string | undefined,
  ) => {
    const payload = await getPayload({ config })

    const where: Where = {}

    if (transactionType) {
      where.transactionType = { equals: transactionType === 'arrendar' ? 'rent' : 'sale' }
    }

    if (propertyType) {
      where.propertyType = { equals: propertyType }
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

    if (minParkingSpaces >= 0) {
      where.parkingSpaces = { greater_than_equal: minParkingSpaces }
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
