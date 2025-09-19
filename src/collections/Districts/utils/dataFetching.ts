import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

export const fetchDistrictsWithProperties = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const districts = await payload.find({
      collection: 'districts',
      where: {
        properties: {
          exists: true,
        },
      },
      depth: 2,
    })

    return {
      ...districts,
      docs: districts.docs.map((district) => ({
        ...district,
        properties: Array.isArray(district.properties)
          ? district.properties.slice(0, 3)
          : district.properties,
      })),
    }
  },
  ['districts-with-properties'],
  {
    tags: ['districts', 'properties'],
  },
)
