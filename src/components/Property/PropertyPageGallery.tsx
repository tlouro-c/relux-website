import React from 'react'
import Image from 'next/image'
import { Property } from '@/payload-types'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'
import { ElementFadeIn } from '../Animations/ElementFadeIn'

interface PropertyPageGalleryProps {
  property: Property
}

export default function PropertyPageGallery({ property }: PropertyPageGalleryProps) {
  if (!property.imageUrls || property.imageUrls.length <= 1) return null

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold line-split-animation">Galeria</h2>
      <ElementFadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {property.imageUrls.slice(1, 7).map(
            (image, index) =>
              image.imageUrl && (
                <div
                  key={index}
                  className="aspect-[3/2] rounded-xl border border-accent/10 overflow-hidden"
                >
                  <Image
                    src={image.imageUrl}
                    alt={`${property.title} - ${index + 2}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ),
          )}
        </div>
      </ElementFadeIn>
    </div>
  )
}
