'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PropertyImageCarouselProps {
  images: Array<{ imageUrl?: string | null; id?: string | null }>
  title: string
}

export default function PropertyImageCarousel({ images, title }: PropertyImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const validImages = images?.filter((img) => img?.imageUrl) || []

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  if (validImages.length === 0) {
    return <div className="aspect-[3/2] w-full bg-zinc-100 shrink-0" />
  }

  return (
    <div className="aspect-[3/2] w-full bg-zinc-100 shrink-0 relative overflow-hidden group/image">
      <Image
        src={validImages[currentImageIndex]?.imageUrl!}
        alt={title}
        height={0}
        width={0}
        sizes="100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw"
        className="object-cover transition-transform duration-300 h-full w-full"
      />

      {/* Preload next and previous images */}
      {validImages.length > 1 && (
        <>
          {validImages[(currentImageIndex + 1) % validImages.length]?.imageUrl && (
            <Image
              src={validImages[(currentImageIndex + 1) % validImages.length]?.imageUrl!}
              alt={`${title} - next`}
              height={0}
              width={0}
              sizes="100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw"
              className="object-cover opacity-0 pointer-events-none h-full w-full"
              priority={false}
            />
          )}
          {validImages[(currentImageIndex - 1 + validImages.length) % validImages.length]
            ?.imageUrl && (
            <Image
              src={
                validImages[(currentImageIndex - 1 + validImages.length) % validImages.length]
                  ?.imageUrl!
              }
              height={0}
              width={0}
              alt={`${title} - previous`}
              sizes="100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw"
              className="object-cover opacity-0 pointer-events-none h-full w-full"
              priority={false}
            />
          )}
        </>
      )}

      {validImages.length > 1 && (
        <>
          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 hover:bg-white/90 z-10"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 hover:bg-white/90 z-10"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
