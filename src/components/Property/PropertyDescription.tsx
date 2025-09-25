import React from 'react'
import { Property } from '@/payload-types'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'

interface PropertyDescriptionProps {
  property: Property
}

export default function PropertyDescription({ property }: PropertyDescriptionProps) {
  if (!property.description) return null

  return (
    <ElementRevealFromBottom delay={0.1}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Descrição</h2>
        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
      </div>
    </ElementRevealFromBottom>
  )
}