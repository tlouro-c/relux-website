import React from 'react'
import { Property } from '@/payload-types'
import { BathIcon, BedIcon, CarIcon, ExpandIcon } from 'lucide-react'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'

interface PropertyContentProps {
  property: Property
  area: number
}

export default function PropertyContent({ property, area }: PropertyContentProps) {
  return (
    <div className="space-y-8">
      {/* Key Features */}
      <div className="flex flex-wrap gap-3">
        {property.usableArea && area > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary border border-accent/5 rounded text-xs font-medium">
            <ExpandIcon className="size-4 text-foreground" strokeWidth={1.5} />
            <span>{area} m²</span>
          </div>
        )}
        {property.bedrooms && property.bedrooms > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary border border-accent/5 rounded text-xs font-medium">
            <BedIcon className="size-4 text-foreground" strokeWidth={1.5} />
            <span>{property.bedrooms} Quartos</span>
          </div>
        )}
        {property.wc && property.wc > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary border border-accent/5 rounded text-xs font-medium">
            <BathIcon className="size-4 text-foreground" strokeWidth={1.5} />
            <span>{property.wc} WC</span>
          </div>
        )}
        {property.parkingSpaces && property.parkingSpaces > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary border border-accent/5 rounded text-xs font-medium">
            <CarIcon className="size-4 text-foreground" strokeWidth={1.5} />
            <span>
              {property.parkingSpaces} Lugar{property.parkingSpaces > 1 ? 'es' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      {property.description && (
        <div>
          <p className="tracking-tight leading-relaxed mb-8 line-split-animation">
            {property.description}
          </p>
        </div>
      )}

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold line-split-animation">Informações Gerais</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground font-medium line-split-animation">
                Referência
              </span>
              <span className="font-semibold line-split-animation">{property.reference}</span>
            </div>
            {property.propertyType && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">Tipo</span>
                <span className="font-semibold line-split-animation">{property.propertyType}</span>
              </div>
            )}
            {property.status && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Estado
                </span>
                <span className="font-semibold line-split-animation">{property.status}</span>
              </div>
            )}
            {property.year && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Ano de Construção
                </span>
                <span className="font-semibold line-split-animation">{property.year}</span>
              </div>
            )}
            {property.energyCertificate && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Certificado Energético
                </span>
                <span className="font-semibold line-split-animation">
                  {property.energyCertificate}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold line-split-animation">Áreas & Espaços</h3>
          <div className="space-y-3 text-sm">
            {property.usableArea && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Área Útil
                </span>
                <span className="font-semibold line-split-animation">{area} m²</span>
              </div>
            )}
            {property.grossArea && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Área Bruta
                </span>
                <span className="font-semibold line-split-animation">
                  {typeof property.grossArea === 'string'
                    ? parseFloat(property.grossArea.replace(/\./g, '').replace(',', '.'))
                    : Number(property.grossArea)}{' '}
                  m²
                </span>
              </div>
            )}
            {property.landArea && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Área do Terreno
                </span>
                <span className="font-semibold line-split-animation">
                  {typeof property.landArea === 'string'
                    ? parseFloat(property.landArea.replace(/\./g, '').replace(',', '.'))
                    : Number(property.landArea)}{' '}
                  m²
                </span>
              </div>
            )}
            {property.bedrooms && property.bedrooms > 0 && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Quartos
                </span>
                <span className="font-semibold line-split-animation">{property.bedrooms}</span>
              </div>
            )}
            {property.wc && property.wc > 0 && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Casas de Banho
                </span>
                <span className="font-semibold line-split-animation">{property.wc}</span>
              </div>
            )}
            {property.parkingSpaces && property.parkingSpaces > 0 && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground font-medium line-split-animation">
                  Lugares de Estacionamento
                </span>
                <span className="font-semibold line-split-animation">{property.parkingSpaces}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
