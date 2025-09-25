import React from 'react'
import { Property } from '@/payload-types'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'

interface PropertyCharacteristicsProps {
  property: Property
  area: number
}

export default function PropertyCharacteristics({ property, area }: PropertyCharacteristicsProps) {
  return (
    <ElementRevealFromBottom delay={0.2}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded p-4 space-y-3">
            <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
              Informações Gerais
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Referência</span>
                <span className="font-semibold">{property.reference}</span>
              </div>
              {property.propertyType && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-semibold">{property.propertyType}</span>
                </div>
              )}
              {property.status && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado</span>
                  <span className="font-semibold">{property.status}</span>
                </div>
              )}
              {property.year && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ano de Construção</span>
                  <span className="font-semibold">{property.year}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded p-4 space-y-3">
            <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
              Áreas
            </h3>
            <div className="space-y-2 text-sm">
              {property.usableArea && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Área Útil</span>
                  <span className="font-semibold">{area} m²</span>
                </div>
              )}
              {property.grossArea && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Área Bruta</span>
                  <span className="font-semibold">
                    {typeof property.grossArea === 'string'
                      ? parseFloat(property.grossArea.replace(/\./g, '').replace(',', '.'))
                      : Number(property.grossArea)}{' '}
                    m²
                  </span>
                </div>
              )}
              {property.landArea && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Área do Terreno</span>
                  <span className="font-semibold">
                    {typeof property.landArea === 'string'
                      ? parseFloat(property.landArea.replace(/\./g, '').replace(',', '.'))
                      : Number(property.landArea)}{' '}
                    m²
                  </span>
                </div>
              )}
              {property.energyCertificate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificado Energético</span>
                  <span className="font-semibold">{property.energyCertificate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ElementRevealFromBottom>
  )
}