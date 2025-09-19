import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

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

export const fetchPropertiesByDistrict = unstable_cache(
  async (district: string, limit: number = 50) => {
    const payload = await getPayload({ config })

    const properties = await payload.find({
      collection: 'properties',
      where: {
        district: {
          equals: district,
        },
      },
      depth: 2,
      limit,
    })

    return properties
  },
  ['properties-by-district'],
  {
    tags: ['properties'],
  },
)
