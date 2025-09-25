import React from 'react'
import { Property } from '@/payload-types'
import { BathIcon, BedIcon, CarIcon, ExpandIcon } from 'lucide-react'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'

interface PropertyKeyFeaturesProps {
  property: Property
  area: number
}

export default function PropertyKeyFeatures({ property, area }: PropertyKeyFeaturesProps) {
  return (
    <ElementRevealFromBottom>
      <div className="flex flex-wrap gap-3 p-4 bg-card border border-border rounded">
        {property.usableArea && area > 0 && (
          <div className="flex items-center gap-2 text-sm font-medium">
            <ExpandIcon className="size-4 text-foreground" strokeWidth={1.5} />
            <span>{area} m²</span>
          </div>
        )}
        {property.bedrooms && property.bedrooms > 0 && (
          <div className="flex items-center gap-2 text-sm font-medium">
            <BedIcon className="size-4 text-foreground" strokeWidth={1.5} />
            <span>{property.bedrooms} Quartos</span>
          </div>
        )}
        {property.wc && property.wc > 0 && (
          <div className="flex items-center gap-2 text-sm font-medium">
            <BathIcon className="size-4 text-foreground" strokeWidth={1.5} />
            <span>{property.wc} WC</span>
          </div>
        )}
        {property.parkingSpaces && property.parkingSpaces > 0 && (
          <div className="flex items-center gap-2 text-sm font-medium">
            <CarIcon className="size-4 text-foreground" strokeWidth={1.5} />
            <span>
              {property.parkingSpaces} Lugar{property.parkingSpaces > 1 ? 'es' : ''}
            </span>
          </div>
        )}
      </div>
    </ElementRevealFromBottom>
  )
}