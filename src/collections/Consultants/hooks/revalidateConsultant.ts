import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Consultant } from '../../../payload-types'

export const revalidateConsultant: CollectionAfterChangeHook<Consultant> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {

  }
  return doc
}