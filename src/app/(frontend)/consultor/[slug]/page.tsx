import { fetchConsultantBySlug } from '@/collections/Consultants/utils/dataFetching'
import { Button } from '@/components/Button'
import Presentation from '@/components/ConsultantPage/Presentation'
import Container from '@/components/Container'
import { MoveUpRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function ConsultorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const consultant = await fetchConsultantBySlug(slug)

  if (!consultant) {
    notFound()
  }

  return (
    <section className="pt-[calc(var(--header-height)+theme(spacing.8))] min-h-svh pb-20 flex flex-col justify-center">
      <Container className="flex">
        <div className="flex-1 shrink-0">
          <Presentation consultant={consultant} />
        </div>
        <div className="flex-1 flex flex-col min-h-full">
          <h1 className="text-6xl tracking-tight highlight mb-4">{consultant.name}</h1>
          <span className=" tracking-tight pb-0.5 ">{consultant.role}</span>
          {consultant.phone && <span className=" tracking-tight pb-0.5 ">{consultant.phone}</span>}
          {consultant.email && <span className="tracking-tight pb-0.5 ">{consultant.email}</span>}
          {consultant.instagram && (
            <Button
              href={consultant.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-fit"
              variant={'secondary'}
              size={'sm'}
            >
              Instagram <MoveUpRightIcon />
            </Button>
          )}
        </div>
      </Container>
    </section>
  )
}
