import React from 'react'
import { Property } from '@/payload-types'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'
import { CheckIcon } from 'lucide-react'

interface PropertyFeaturesProps {
  property: Property
}

export default function PropertyFeatures({ property }: PropertyFeaturesProps) {
  // Create a list of features based on property data
  const features = []

  if (property.transactionType === 'rent') {
    features.push('Arrendamento')
  } else {
    features.push('Venda')
  }

  if (property.energyCertificate) {
    features.push(`Certificado Energético: ${property.energyCertificate}`)
  }

  if (property.year) {
    features.push(`Construção: ${property.year}`)
  }

  if (property.parkingSpaces && property.parkingSpaces > 0) {
    features.push(`${property.parkingSpaces} lugar${property.parkingSpaces > 1 ? 'es' : ''} de estacionamento`)
  }

  if (property.bedrooms && property.bedrooms > 0) {
    features.push(`${property.bedrooms} quarto${property.bedrooms > 1 ? 's' : ''}`)
  }

  if (property.wc && property.wc > 0) {
    features.push(`${property.wc} casa${property.wc > 1 ? 's' : ''} de banho`)
  }

  const usableArea = typeof property.usableArea === 'string'
    ? parseFloat(property.usableArea.replace(/\./g, '').replace(',', '.'))
    : Number(property.usableArea)

  if (property.usableArea && usableArea > 0) {
    features.push(`${usableArea} m² de área útil`)
  }

  const grossArea = typeof property.grossArea === 'string'
    ? parseFloat(property.grossArea.replace(/\./g, '').replace(',', '.'))
    : Number(property.grossArea)

  if (property.grossArea && grossArea > 0) {
    features.push(`${grossArea} m² de área bruta`)
  }

  const landArea = typeof property.landArea === 'string'
    ? parseFloat(property.landArea.replace(/\./g, '').replace(',', '.'))
    : Number(property.landArea)

  if (property.landArea && landArea > 0) {
    features.push(`${landArea} m² de terreno`)
  }

  if (property.status && property.status.toLowerCase() !== 'disponível') {
    features.push(`Estado: ${property.status}`)
  }

  if (property.availability) {
    features.push(`Disponibilidade: ${property.availability}`)
  }

  // If no specific features, return null
  if (features.length === 0) {
    return null
  }

  return (
    <ElementRevealFromBottom delay={0.2}>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Características</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-card rounded border border-border">
              <CheckIcon className="size-4 text-foreground mt-0.5 shrink-0" strokeWidth={2} />
              <span className="text-sm leading-relaxed font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </ElementRevealFromBottom>
  )
}