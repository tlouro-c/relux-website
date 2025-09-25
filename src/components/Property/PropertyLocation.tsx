import React from 'react'
import { Property } from '@/payload-types'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'
import { MapPinIcon, NavigationIcon } from 'lucide-react'

interface PropertyLocationProps {
  property: Property
}

export default function PropertyLocation({ property }: PropertyLocationProps) {
  const hasLocationData = property.district || property.county || property.parish || property.address

  if (!hasLocationData) {
    return null
  }

  const locationDetails = [
    { label: 'Distrito', value: property.district },
    { label: 'Concelho', value: property.county },
    { label: 'Freguesia', value: property.parish },
    { label: 'Morada', value: property.address },
    { label: 'Código Postal', value: property.postalCode },
    { label: 'Localidade', value: property.location },
  ].filter(item => item.value)

  const hasCoordinates = property.latitude && property.longitude

  return (
    <ElementRevealFromBottom delay={0.5}>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <MapPinIcon className="size-5 text-foreground" strokeWidth={1.5} />
          <h3 className="text-xl font-semibold">Localização</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location Details */}
          <div className="space-y-4">
            {locationDetails.map((detail, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">{detail.label}</span>
                <span className="font-semibold text-right max-w-[60%] break-words">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          {/* Map */}
          {hasCoordinates && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded overflow-hidden bg-card border border-border">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${property.latitude},${property.longitude}&zoom=15`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Localização do Imóvel"
                />
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://www.google.com/maps/place/${property.latitude},${property.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors duration-200"
                >
                  <NavigationIcon className="size-4" strokeWidth={1.5} />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          )}
        </div>

        {!hasCoordinates && (
          <div className="p-6 bg-card border border-border rounded text-center">
            <MapPinIcon className="size-8 mx-auto mb-2 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground font-medium">
              Coordenadas não disponíveis para este imóvel
            </p>
          </div>
        )}
      </div>
    </ElementRevealFromBottom>
  )
}