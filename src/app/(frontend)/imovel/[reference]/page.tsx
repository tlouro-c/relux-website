import { fetchPropertyByReference } from '@/collections/Properties/utils/dataFetching'
import Container from '@/components/Container'
import { notFound } from 'next/navigation'
import React from 'react'
import { Property, Consultant } from '@/payload-types'
import PropertyPageHero from '@/components/Property/PropertyPageHero'
import PropertyContent from '@/components/Property/PropertyContent'
import PropertyPageGallery from '@/components/Property/PropertyPageGallery'
import PropertyPageSidebar from '@/components/Property/PropertyPageSidebar'

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
  const transactionTypeLabel = property.transactionType === 'rent' ? 'Arrendar' : 'Comprar'
  const priceNumber =
    typeof property.price === 'string'
      ? parseFloat(property.price.replace(/\./g, '').replace(',', '.'))
      : Number(property.price)
  const price = priceNumber.toLocaleString('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
  const area =
    typeof property.usableArea === 'string'
      ? parseFloat(property.usableArea.replace(/\./g, '').replace(',', '.'))
      : Number(property.usableArea)

  return (
    <section className="pt-[calc(var(--header-height)+theme(spacing.8))] pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyPageHero
              property={property}
              location={location || ''}
              price={price}
              transactionTypeLabel={transactionTypeLabel}
            />
            <PropertyContent property={property} area={area} />
            <PropertyPageGallery property={property} />
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <PropertyPageSidebar
              property={property}
              price={price}
              transactionTypeLabel={transactionTypeLabel}
              area={area}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
