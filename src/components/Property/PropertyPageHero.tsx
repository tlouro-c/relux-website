'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Property } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/Container'

interface PropertyPageHeroProps {
  property: Property
  location: string
}

export default function PropertyPageHero({ property, location }: PropertyPageHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const validImages = property.imageUrls?.filter((img) => img?.imageUrl) || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  // Indices for the next four preview images (2x2 grid)
  const previewIndices = Array.from(
    { length: 4 },
    (_, i) => (currentImageIndex + i + 1) % validImages.length,
  )

  return (
    <section className="pt-[calc(var(--header-height)+theme(spacing.8))]">
      <Container className="grid md:grid-cols-[1fr_480px] gap-x-8 items-start" >
        {/* Main Image (left side) */}
        <div
          className="col-span-1 w-full h-full relative overflow-hidden rounded-xl group"
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px',
          }}
        >
          <Image
            src={validImages[currentImageIndex]?.imageUrl!}
            alt={property.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-300"
            priority
            decoding="sync"
          />

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
            <div className="absolute lining-nums top-6 right-6 bg-black/50 backdrop-blur-sm text-background px-3 py-1 rounded-xl text-sm z-10">
              {currentImageIndex + 1} / {validImages.length}
            </div>
          )}

          {/* New Tag */}
          {property.isNew && (
            <span className="inline-block top-6 left-6 absolute bg-foreground text-background text-sm font-medium px-3 py-1 w-fit rounded-lg">
              Novidade
            </span>
          )}
        </div>

        {/* Right column: 2x2 grid of previews (match height of main image) */}
        <div className="col-span-1 h-full grid grid-cols-2 gap-8 aspect-square">
          {previewIndices.map((i) => {
            const img = validImages[i]
            if (!img?.imageUrl) return null
            return (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className="relative w-full h-full overflow-hidden rounded-xl group"
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.2) 0px 0px 3px 0px, rgba(0, 0, 0, 0.2) 0px 0px 1px 0px',
                }}
              >
                <Image
                  src={img.imageUrl}
                  alt={`${property.title} preview ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            )
          })}
        </div>

        {/* Property Info Below */}
        <div className="col-span-2 py-4">
          <h1 className="text-lg line-split-animation">
            <span className="block text-2xl md:text-3xl font-semibold">{location}</span>
            <br />
            {property.title}
          </h1>
          <p className="text-3xl mt-4 font-semibold lining-nums line-split-animation tracking-tighter">
            {property.priceVisible ? (
              <span>{property.price}</span>
            ) : (
              <span>Preço sob consulta</span>
            )}
          </p>
        </div>
      </Container>
    </section>
  )
}
