import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const fetchTeam = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const team = await payload.find({
      collection: 'consultants',
      limit: 100,
      sort: 'name',
      depth: 1,
    })

    return team
  },
  ['team'],
  { tags: ['consultants'] },
)

export const fetchConsultantBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })

    const consultant = await payload.find({
      collection: 'consultants',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 1,
    })

    return consultant?.docs?.[0] || null
  },
  ['consultant'],
  { tags: ['consultants'] },
)
