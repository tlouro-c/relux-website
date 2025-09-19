import React from 'react'
import Container from '../Container'
import LocationSectionButton from './LocationSectionButton'
import { fetchDistrictsWithProperties } from '@/collections/Districts/utils/dataFetching'
import PropertyCard from '../Property/PropertyCard'
import { Consultant, Property } from '@/payload-types'

export default async function LocationsSection() {
  const districts = await fetchDistrictsWithProperties()

  return (
    <section className="py-20">
      <Container>
        <header className="flex justify-between items-center mb-16">
          <div>
            <p className="section-badge line-split-animation text-accent">Localizações</p>
            <h2 className="section-title line-split-animation">A Localização Ideal Para Si</h2>
          </div>
        </header>
        <div className="flex">
          <div className="flex-1">
            <nav>
              <ul>
                {districts.docs.map((district) => (
                  <LocationSectionButton key={district.id} index={1} location={district.name}>
                    {district.name}
                  </LocationSectionButton>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex-[2]">
            {districts.docs[0].properties
              ?.filter((property): property is Property => typeof property === 'object')
              .map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  consultant={property.consultant as Consultant}
                />
              ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
