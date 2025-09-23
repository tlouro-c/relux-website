import { FormBlock } from '@/blocks/Form/Component'
import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { Form } from '@/payload-types'
import Container from '@/components/Container'
import Image from 'next/image'
import { MultiStepForm } from '@/blocks/CustomContactForm/Component'

export default async function Contacto() {
  const payload = await getPayload({ config })
  const formDocs = await payload.find({
    collection: 'forms',
    limit: 1,
  })
  const form: Form = formDocs?.docs?.[0]
  if (!form) return null

  return (
    <section className="pt-[var(--header-height)] min-h-svh mb-20">
      <div className="absolute left-0 top-[var(--header-height)] w-1/2 h-[calc(100vh-var(--header-height))] flex items-center justify-center">
        <Image
          src={'/images/contact/contacto-relux.png'}
          alt={''}
          sizes="50vw"
          height={0}
          width={0}
          className="object-cover w-full h-full absolute inset-0"
          priority
          decoding='sync'
        />
        <div className="w-full h-full absolute inset-0 z-[1]" />
      </div>
      <Container className="flex">
        <div className="flex-1" />
        <div className="flex-1">
          <MultiStepForm formId={form.id} />
        </div>
      </Container>
    </section>
  )
}
