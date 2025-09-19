import { Property } from '@/payload-types'
import { slugify, unslugify } from '@/utilities/global'
import { CollectionAfterChangeHook } from 'payload'

export const updateDistrict: CollectionAfterChangeHook<Property> = async ({
  doc,
  req: { payload },
  operation,
}) => {
  if (operation !== 'create') {
    return doc
  }

  const districtSlug = slugify(doc.district || '')

  if (doc.district) {
    const district = await payload.find({
      collection: 'districts',
      where: {
        slug: {
          equals: districtSlug,
        },
      },
    })

    if (district.totalDocs > 0) {
      const d = district.docs[0]
      const existingProperties = d.properties || []
      await payload.update({
        collection: 'districts',
        where: {
          slug: {
            equals: districtSlug,
          },
        },
        data: {
          properties: [...existingProperties, doc.id],
        },
      })
    } else {
      await payload.create({
        collection: 'districts',
        data: {
          name: unslugify(districtSlug),
          slug: districtSlug,
          properties: [doc.id],
        },
      })
    }
  }

  return doc
}
