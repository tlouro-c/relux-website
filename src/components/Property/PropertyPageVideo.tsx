import React from 'react'
import { Property } from '@/payload-types'
import { ElementFadeIn } from '../Animations/ElementFadeIn'

interface PropertyPageVideoProps {
  property: Property
}

export default function PropertyPageVideo({ property }: PropertyPageVideoProps) {
  if (!property.videoUrl) return null

  return (
    <div className="mt-24" id="video">
      <h2 className="text-2xl md:text-3xl mt-auto font-bold line-split-animation mb-8 sr-only">Vídeo</h2>
      <ElementFadeIn>
        <div className="rounded-xl aspect-[2/1] border border-accent/10 overflow-hidden bg-secondary">
          <video
            preload="metadata"
            controls
            className="w-full h-full object-cover"
            poster={property.imageUrls?.[0]?.imageUrl || undefined}
          >
            <source src={property.videoUrl} type="video/mp4" />
          </video>
        </div>
      </ElementFadeIn>
    </div>
  )
}
