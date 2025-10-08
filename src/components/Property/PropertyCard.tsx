import { Consultant, Property } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import { ArrowRightIcon, CircleIcon } from 'lucide-react'
import PropertyImageCarousel from './PropertyImageCarousel'
import { Button } from '../Button'

interface PropertyCardProps {
  property: Pick<
    Property,
    | 'title'
    | 'reference'
    | 'price'
    | 'transactionType'
    | 'priceVisible'
    | 'imageUrls'
    | 'bedrooms'
    | 'wc'
    | 'usableArea'
    | 'parkingSpaces'
    | 'isNew'
    | 'district'
    | 'county'
    | 'availability'
  >
  consultant?: Pick<Consultant, 'imageUrl' | 'name'>
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const location = property.county ? `${property.county}, ${property.district}` : property.district

  const area =
    typeof property.usableArea === 'string'
      ? parseFloat(property.usableArea.replace(/\./g, '').replace(',', '.'))
      : Number(property.usableArea)

  return (
    <Link
      href={`/imovel/${property.reference}`}
      className="relative block group/button w-full md:min-w-64 rounded-xl mt-4 md:mt-6"
    >
      <span className="absolute -top-3 -left-3 w-3 h-3 border-l border-t border-foreground rounded-tl transition-opacity duration-500 opacity-0 group-hover/button:opacity-100" />
      <span className="absolute -bottom-3 -left-3 w-3 h-3 border-l border-b border-foreground rounded-bl transition-opacity duration-500 opacity-0 group-hover/button:opacity-100" />
      <span className="absolute -top-3 -right-3 w-3 h-3 border-r border-t border-foreground rounded-tr transition-opacity duration-500 opacity-0 group-hover/button:opacity-100" />
      <span className="absolute -bottom-3 -right-3 w-3 h-3 border-r border-b border-foreground rounded-br transition-opacity duration-500 opacity-0 group-hover/button:opacity-100" />

      <article
        className={`h-full flex flex-col ${property.availability === 'available' ? '' : 'grayscale'}`}
      >
        {property.isNew && (
          <span className="absolute top-0 left-0 text-sm bg-secondary rounded-tl-xl rounded-br-xl text-foreground font-semibold pointer-events-none py-2 px-4 z-10">
            Novidade
          </span>
        )}
        <div
          className="w-full rounded-xl"
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
          }}
        >
          <PropertyImageCarousel images={property.imageUrls || []} title={property.title} />
        </div>
        <div className="pt-4 md:pt-6 gap-2 flex flex-col flex-1 justify-between relative">
          <div>
            {property.priceVisible ? (
              <p className="text-xl leading-none lining-nums font-bold">{property.price}</p>
            ) : (
              <p className="text-xl leading-none lining-nums font-bold">Preço Sob Consulta</p>
            )}
            <p className="text-xl">{location}</p>
          </div>
          <div className="flex gap-8 items-end mt-4">
            <div className="flex text-xs text-nowrap lining-nums font-semibold uppercase tracking-tight">
              {property.usableArea && <span className="flex items-center gap-1">{area} m²</span>}
              {property.bedrooms && (
                <span className="flex items-center gap-1">
                  <CircleIcon className="size-1 mx-2 md:mx-3 fill-foreground stroke-none" />
                  {property.bedrooms} Quartos
                </span>
              )}
              {property.wc && (
                <span className="flex items-center gap-1">
                  <CircleIcon className="size-1 mx-2 md:mx-3 fill-foreground stroke-none" />
                  {property.wc} WC
                </span>
              )}
              {property.parkingSpaces != 0 && (
                <span className="flex items-center gap-1">
                  <CircleIcon className="size-1 mx-2 md:mx-3 fill-foreground stroke-none" />
                  {property.parkingSpaces} Lugares
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
