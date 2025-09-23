import React from 'react'
import Container from '../Container'
import LocationSectionButton from './LocationSectionButton'
import { fetchDistrictsWithProperties } from '@/collections/Districts/utils/dataFetching'
import LocationsGrid from './LocationsGrid'

export default async function LocationsSection() {
  const districts = await fetchDistrictsWithProperties()

  return (
    <section className="py-20">
      <Container>
        <header className="mb-16 flex flex-col items-center md:items-start">
          <p className="section-badge line-split-animation text-accent">Localizações</p>
          <h2 className="section-title line-split-animation">A Localização Ideal Para Si</h2>
        </header>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <nav className="h-full">
              <ul className="flex flex-col h-full">
                {districts.docs.map((district) => (
                  <LocationSectionButton key={district.id} index={1} location={district.name}>
                    {district.name}
                  </LocationSectionButton>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex-[3]">
            <LocationsGrid districts={districts.docs} />
          </div>
        </div>
      </Container>
    </section>
  )
}
