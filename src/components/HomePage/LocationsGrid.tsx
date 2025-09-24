'use client'

import { Consultant, District, Property } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import PropertyCard from '../Property/PropertyCard'
import { Button } from '../Button'
import { ForwardIcon } from 'lucide-react'

export default function LocationsGrid({ districts }: { districts: District[] }) {
  const searchParams = useSearchParams()
  const [propertiesOnDisplay, setPropertiesOnDisplay] = React.useState<Property[]>([])

  React.useEffect(() => {
    const currentDistrict = searchParams.get('distrito') || districts[0]?.slug
    const district = districts.find((d) => d.slug === currentDistrict)
    if (district) {
      setPropertiesOnDisplay((district.properties as Property[]) || [])
    }
  }, [searchParams, districts])

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      {propertiesOnDisplay.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          consultant={property.consultant as Consultant}
        />
      ))}
      <div className="col-span-1 lg:col-span-2 2xl:col-span-3 flex justify-end mt-4">
        <Button variant={'secondary'} href="/imoveis/aveiro">
          Mais Imóveis em{' '}
          <span className="capitalize highlight pb-1 -ms-2">
            {searchParams.get('distrito') || districts[0]?.slug}
          </span>{' '}
          <ForwardIcon />
        </Button>
      </div>
    </div>
  )
}
