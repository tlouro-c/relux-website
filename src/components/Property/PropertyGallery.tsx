'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'

interface PropertyGalleryProps {
  images: Array<{ imageUrl?: string | null; id?: string | null }>
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  const validImages = images?.filter((img) => img?.imageUrl) || []

  if (validImages.length === 0) {
    return null
  }

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index)
    setIsLightboxOpen(true)
  }

  return (
    <>
      <ElementRevealFromBottom delay={0.3}>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Galeria de Imagens</h3>

          {/* Grid Layout for Multiple Images */}
          {validImages.length > 1 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {validImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square overflow-hidden rounded bg-card border border-border hover:opacity-75 transition-opacity duration-300"
                >
                  <Image
                    src={image.imageUrl!}
                    alt={`${title} - ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </button>
              ))}
            </div>
          ) : (
            /* Single Image Layout */
            <button
              onClick={() => openLightbox(0)}
              className="group relative w-full aspect-[16/10] overflow-hidden rounded bg-card border border-border hover:opacity-75 transition-opacity duration-300"
            >
              <Image
                src={validImages[0].imageUrl!}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="100vw"
              />
            </button>
          )}

          {validImages.length > 1 && (
            <p className="text-sm text-muted-foreground text-center">
              {validImages.length} imagens disponíveis. Clique para ver em ecrã completo.
            </p>
          )}
        </div>
      </ElementRevealFromBottom>

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
              alt={`${title} - ${lightboxImageIndex + 1}`}
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