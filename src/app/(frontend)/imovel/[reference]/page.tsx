import { fetchPropertyByReference } from '@/collections/Properties/utils/dataFetching'
import Container from '@/components/Container'
import { notFound } from 'next/navigation'
import React from 'react'
import { Property, Consultant } from '@/payload-types'
import PropertyPageHero from '@/components/Property/PropertyPageHero'
import PropertyContent from '@/components/Property/PropertyContent'
import PropertyPageSidebar from '@/components/Property/PropertyPageSidebar'
import CalWidget from '@/components/Property/CalWidget'
import PropertyPageVideo from '@/components/Property/PropertyPageVideo'
import PropertyPageVirtualTour from '@/components/Property/PropertyPageVirtualTour'

export default async function Imovel({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params

  const propertyDocs = await fetchPropertyByReference(reference)
  if (!propertyDocs || propertyDocs.totalDocs === 0) {
    notFound()
  }
  const property = propertyDocs.docs[0] as Property & {
    consultant?: Consultant
  }

  const location = property.county ? `${property.district}, ${property.county}` : property.district

  return (
    <>
      <CalWidget />
      <section className="pt-[calc(var(--header-height)+theme(spacing.8))] pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              <PropertyPageHero property={property} location={location || ''} />
              <PropertyContent property={property} />
              <PropertyPageVideo property={property} />
              <PropertyPageVirtualTour property={property} />
            </div>

            <div className="lg:col-span-1">
              <PropertyPageSidebar property={property} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
