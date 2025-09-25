'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Property } from '@/payload-types'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'

interface PropertyHeroProps {
  property: Property
}

export default function PropertyHero({ property }: PropertyHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  const validImages = property.imageUrls?.filter((img) => img?.imageUrl) || []
  const location = property.county ? `${property.district}, ${property.county}` : property.district
  const transactionTypeLabel = property.transactionType === 'rent' ? 'Arrendar' : 'Comprar'

  const priceNumber =
    typeof property.price === 'string'
      ? parseFloat(property.price.replace(/\./g, '').replace(',', '.'))
      : Number(property.price)

  const price = priceNumber.toLocaleString('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index)
    setIsLightboxOpen(true)
  }

  return (
    <>
      <section className="relative h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
        {validImages.length > 0 ? (
          <div className="relative h-full">
            <Image
              src={validImages[currentImageIndex]?.imageUrl!}
              alt={property.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1]" />

            {/* Navigation */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-[2]"
                >
                  <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-[2]"
                >
                  <ChevronRight className="w-6 h-6 text-white" strokeWidth={2} />
                </button>
              </>
            )}

            {/* Gallery Button */}
            {validImages.length > 1 && (
              <button
                onClick={() => openLightbox(currentImageIndex)}
                className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded hover:bg-white/30 transition-all duration-300 z-[2] text-sm font-medium"
              >
                Ver todas ({validImages.length})
              </button>
            )}

            {/* Property Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[2]">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <ElementRevealFromBottom>
                  <div className="space-y-2 md:space-y-4">
                    {property.isNew && (
                      <span className="inline-block bg-white text-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                        Novidade
                      </span>
                    )}
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                      {property.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90">{location}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div>
                        {property.priceVisible ? (
                          <p className="text-xl md:text-2xl font-light text-white highlight">
                            {price}
                          </p>
                        ) : (
                          <p className="text-xl md:text-2xl font-light text-white highlight">
                            Preço Sob Consulta
                          </p>
                        )}
                      </div>
                      <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
                        {transactionTypeLabel}
                      </span>
                    </div>
                  </div>
                </ElementRevealFromBottom>
              </div>
            </div>

            {/* Image Counter */}
            {validImages.length > 1 && (
              <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded text-sm z-[2]">
                {currentImageIndex + 1} / {validImages.length}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            <div className="text-center space-y-4 p-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
                {property.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">{location}</p>
              {property.priceVisible ? (
                <p className="text-xl md:text-2xl font-light text-foreground highlight">
                  {price}
                </p>
              ) : (
                <p className="text-xl md:text-2xl font-light text-foreground highlight">
                  Preço Sob Consulta
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-[2]"
          >
            <X className="w-6 h-6 text-white" strokeWidth={2} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-6">
            <Image
              src={validImages[lightboxImageIndex]?.imageUrl!}
              alt={`${property.title} - ${lightboxImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />

            {validImages.length > 1 && (
              <>
                <button
                  onClick={() => setLightboxImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
                </button>
                <button
                  onClick={() => setLightboxImageIndex((prev) => (prev + 1) % validImages.length)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6 text-white" strokeWidth={2} />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              {lightboxImageIndex + 1} de {validImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}