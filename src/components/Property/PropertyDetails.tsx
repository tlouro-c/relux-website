import React from 'react'
import { Property } from '@/payload-types'
import { BathIcon, BedIcon, CarIcon, ExpandIcon, CalendarIcon, ZapIcon } from 'lucide-react'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const area =
    typeof property.usableArea === 'string'
      ? parseFloat(property.usableArea.replace(/\./g, '').replace(',', '.'))
      : Number(property.usableArea)

  const grossArea =
    typeof property.grossArea === 'string'
      ? parseFloat(property.grossArea.replace(/\./g, '').replace(',', '.'))
      : Number(property.grossArea)

  const landArea =
    typeof property.landArea === 'string'
      ? parseFloat(property.landArea.replace(/\./g, '').replace(',', '.'))
      : Number(property.landArea)

  return (
    <ElementRevealFromBottom>
      <div className="space-y-8">
        {/* Property Type and Reference */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            {property.propertyType && (
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1 font-medium">
                {property.propertyType}
              </p>
            )}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold">Ref: {property.reference}</span>
              {property.status && (
                <span className="text-sm px-3 py-1 bg-secondary text-foreground rounded font-medium">
                  {property.status}
                </span>
              )}
            </div>
          </div>
          {property.availability && (
            <span className="text-sm text-success font-semibold">
              {property.availability}
            </span>
          )}
        </div>

        {/* Description */}
        {property.description && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Descrição</h2>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>
        )}

        {/* Key Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {property.usableArea && area > 0 && (
            <div className="text-center p-4 bg-card border border-border rounded">
              <ExpandIcon className="size-6 mx-auto mb-2 text-foreground" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground font-medium">Área Útil</p>
              <p className="font-semibold">{area} m²</p>
            </div>
          )}

          {property.bedrooms !== undefined && property.bedrooms > 0 && (
            <div className="text-center p-4 bg-card border border-border rounded">
              <BedIcon className="size-6 mx-auto mb-2 text-foreground" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground font-medium">Quartos</p>
              <p className="font-semibold">{property.bedrooms}</p>
            </div>
          )}

          {property.wc !== undefined && property.wc > 0 && (
            <div className="text-center p-4 bg-card border border-border rounded">
              <BathIcon className="size-6 mx-auto mb-2 text-foreground" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground font-medium">Casas de Banho</p>
              <p className="font-semibold">{property.wc}</p>
            </div>
          )}

          {property.parkingSpaces !== undefined && property.parkingSpaces > 0 && (
            <div className="text-center p-4 bg-card border border-border rounded">
              <CarIcon className="size-6 mx-auto mb-2 text-foreground" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground font-medium">Estacionamento</p>
              <p className="font-semibold">{property.parkingSpaces}</p>
            </div>
          )}
        </div>

        {/* Additional Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Detalhes Adicionais</h3>
          <div className="space-y-4">
            {property.grossArea && grossArea > 0 && (
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">Área Bruta</span>
                <span className="font-semibold">{grossArea} m²</span>
              </div>
            )}

            {property.landArea && landArea > 0 && (
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">Área do Terreno</span>
                <span className="font-semibold">{landArea} m²</span>
              </div>
            )}

            {property.year && (
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">Ano de Construção</span>
                <span className="font-semibold">{property.year}</span>
              </div>
            )}

            {property.energyCertificate && (
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">Certificado Energético</span>
                <span className="font-semibold">{property.energyCertificate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </ElementRevealFromBottom>
  )
}