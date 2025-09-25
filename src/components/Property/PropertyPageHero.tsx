'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Property } from '@/payload-types'
import { MapPinIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/Container'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'

interface PropertyPageHeroProps {
  property: Property
  location: string
  price: string
  transactionTypeLabel: string
}

export default function PropertyPageHero({
  property,
  location,
  price,
  transactionTypeLabel,
}: PropertyPageHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const validImages = property.imageUrls?.filter((img) => img?.imageUrl) || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  return (
    <div className="pt-[calc(var(--header-height)+theme(spacing.8))] aspect-[3/2] relative overflow-hidden rounded group">
      {validImages.length > 0 ? (
        <Image
          src={validImages[currentImageIndex].imageUrl!}
          alt={property.title}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="80vw"
        />
      ) : (
        <div className="w-full h-full bg-card" />
      )}

      {/* Navigation Arrows */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/30 z-10"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/30 z-10"
          >
            <ChevronRight className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </>
      )}

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-background px-3 py-1 rounded text-sm z-10">
          {currentImageIndex + 1} / {validImages.length}
        </div>
      )}

      {/* Property Title Overlay */}
      <div className="absolute h-full bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
        <Container className="py-6 h-full">
          <div className="text-background h-full flex flex-col gap-2">
            {property.isNew && (
              <span className="inline-block bg-foreground text-background text-xs font-medium px-3 py-1 w-fit rounded tracking-wide mb-auto">
                Novidade
              </span>
            )}
            <h1 className="mt-auto text-2xl md:text-4xl font-semibold line-split-animation">
              {property.title}
            </h1>
            <ElementRevealFromBottom>
              <p className="text-lg flex items-center gap-2">
                <MapPinIcon className="size-4" strokeWidth={1.5} />
                {location}
              </p>
            </ElementRevealFromBottom>
            <div className="flex items-end gap-6">
              {property.priceVisible ? (
                <p className="text-2xl md:text-4xl font-light highlight line-split-animation">
                  {price}
                </p>
              ) : (
                <p className="text-xl md:text-2xl font-light highlight line-split-animation">
                  Preço Sob Consulta
                </p>
              )}
              <span className="mb-1 text-sm tracking-tight line-split-animation">
                {transactionTypeLabel}
              </span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
