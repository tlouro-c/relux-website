import { Consultant, Property } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { BathIcon, BedIcon, ExpandIcon } from 'lucide-react'
import PropertyImageCarousel from './PropertyImageCarousel'

interface PropertyCardProps {
  property: Pick<
    Property,
    | 'title'
    | 'price'
    | 'transactionType'
    | 'priceVisible'
    | 'imageUrls'
    | 'bedrooms'
    | 'wc'
    | 'usableArea'
    | 'garages'
    | 'isNew'
    | 'district'
    | 'county'
    | 'slug'
  >
  consultant?: Pick<Consultant, 'imageUrl' | 'name'>
}

export default function PropertyCard({ property }: PropertyCardProps) {
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

  const area =
    typeof property.usableArea === 'string'
      ? parseFloat(property.usableArea.replace(/\./g, '').replace(',', '.'))
      : Number(property.usableArea)

  return (
    <div className="p-12 md:p-16 border-b border-l border-accent/5 border-collapse">
      <Link
        href={`/imoveis/${property.slug}`}
        className="relative block group overflow-hidden rounded-lg min-w-64 aspect-[4/5] bg-white"
      >
        <article className="h-full flex flex-col">
          {property.isNew && (
            <span className="absolute top-0 left-0 text-xs bg-foreground rounded-br-lg text-background font-medium pointer-events-none py-1 px-2 z-10">
              Novidade
            </span>
          )}
          <PropertyImageCarousel images={property.imageUrls || []} title={property.title} />
          <div className="pt-8 pb-6 px-6 gap-4 flex flex-col flex-1 justify-between">
            <div className="">
              <div className="flex gap-3 justify-between">
                <h2 className="text-xs">{property.title}</h2>
                <p className="text-xs text-right">{transactionTypeLabel}</p>
              </div>
              <p className="text-xl font-medium">{location}</p>
              {property.priceVisible ? (
                <p className="text-xl highlight">{price}</p>
              ) : (
                <p className="text-xl highlight">Preço Sob Consulta</p>
              )}
            </div>
            <div className="flex gap-6 items-end">
              <div className="flex text-xs gap-2">
                {property.usableArea && (
                  <span className="flex items-center gap-1">
                    <ExpandIcon className="size-4" strokeWidth={1.5} /> {area} m²
                  </span>
                )}
                {property.bedrooms && (
                  <span className="flex items-center gap-1">
                    <BedIcon className="size-4" strokeWidth={1.5} />
                    {property.bedrooms}
                  </span>
                )}
                {property.wc && (
                  <span className="flex items-center gap-1">
                    <BathIcon className="size-4" strokeWidth={1.5} />
                    {property.wc}
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}
