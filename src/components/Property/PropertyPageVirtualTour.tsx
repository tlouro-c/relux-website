import React from 'react'
import { Property } from '@/payload-types'
import { ElementFadeIn } from '../Animations/ElementFadeIn'

interface PropertyPageVirtualTourProps {
  property: Property
}

export default function PropertyPageVirtualTour({ property }: PropertyPageVirtualTourProps) {
  if (!property.virtualTourUrl) return null

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold line-split-animation">Tour Virtual</h2>
      <ElementFadeIn>
        <div className="aspect-video rounded-xl border border-accent/10 overflow-hidden bg-secondary">
          <iframe
            src={property.virtualTourUrl}
            title="Tour Virtual"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </ElementFadeIn>
    </div>
  )
}
