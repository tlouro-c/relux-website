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

  return (
    <div
      className="aspect-[16/10] relative overflow-hidden rounded-xl group "
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px',
      }}
    >
      <Image
        src={validImages[currentImageIndex]?.imageUrl!}
        alt={property.title}
        height={0}
        width={0}
        sizes="100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw"
        className="object-cover transition-transform duration-300 h-full w-full"
        priority
        decoding='sync'
      />

      {/* Preload next and previous images */}
      {validImages.length > 1 && (
        <>
          {validImages[(currentImageIndex + 1) % validImages.length]?.imageUrl && (
            <Image
              src={validImages[(currentImageIndex + 1) % validImages.length]?.imageUrl!}
              alt={`${property.title} - next`}
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
              alt={`${property.title} - previous`}
              sizes="100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw"
              className="object-cover opacity-0 pointer-events-none h-full w-full"
              priority={false}
            />
          )}
        </>
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
        <div className="absolute lining-nums top-6 right-6 bg-black/50 backdrop-blur-sm text-background px-3 py-1 rounded-xl text-sm z-10">
          {currentImageIndex + 1} / {validImages.length}
        </div>
      )}

      {/* Property Title Overlay */}
      {property.isNew && (
        <span className="inline-block top-6 left-6 absolute bg-foreground text-background text-sm font-medium px-3 py-1 w-fit rounded-lg">
          Novidade
        </span>
      )}
      <div className="absolute h-full bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col">
        <Container className="py-6 h-fit flex justify-between items-end text-background mt-auto">
          <h1 className="text-lg font-medium line-split-animation">
            {property.title} <br />
            <span className="block text-2xl md:text-4xl font-bold">{location}</span>
          </h1>
          <p className="text-4xl font-bold lining-nums text-background line-split-animation tracking-tighter">
            {property.priceVisible ? (
              <span>{property.price}</span>
            ) : (
              <span>Preço sob consulta</span>
            )}
          </p>
        </Container>
      </div>
    </div>
  )
}
