import React from 'react'
import Container from '../Container'
import { fetchFeaturedProperties } from '@/collections/Properties/utils/dataFetching'
import PropertyCard from '../Property/PropertyCard'

export default async function FeaturedPropertiesSection() {
  const properties = await fetchFeaturedProperties()

  return (
    <section className="py-20">
      <Container>
        <header className="mb-16 flex flex-col items-center text-center">
          <p className="section-badge line-split-animation text-accent">Destaques</p>
          <h2 className="section-title line-split-animation !text-center">As Nossas Escolhas Para Si</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.docs.map((property) => (
            <PropertyCard key={property.reference} property={property} />
          ))}
        </div>
      </Container>
    </section>
  )
}
