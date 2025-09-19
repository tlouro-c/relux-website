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
  consultant: Pick<Consultant, 'imageUrl' | 'name'>
}

export default function PropertyCard({ property, consultant }: PropertyCardProps) {
  const location = property.county ? `${property.district}, ${property.county}` : property.district

  const transactionTypeLabel = property.transactionType === 'sale' ? 'Venda' : 'Arrendamento'

  const priceNumber =
    typeof property.price === 'string'
      ? parseFloat(property.price.replace(/\./g, '').replace(',', '.'))
      : Number(property.price)

  const price = priceNumber.toLocaleString('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })

  return (
    <Link
      href={`/imoveis/${property.slug}`}
      className="relative block group overflow-hidden rounded-lg w-fit aspect-[4/5] shadow-md shadow-accent/5 border border-accent/5"
    >
      <article className="h-full flex flex-col">
        {property.isNew && (
          <span className="absolute top-0 left-0 text-xs bg-foreground rounded-br-lg text-background font-medium pointer-events-none py-1 px-2 z-10">Novidade</span>
        )}
        <PropertyImageCarousel images={property.imageUrls || []} title={property.title} />
        <div className="py-8 px-6 flex flex-col flex-1 justify-between">
          <div className="flex justify-between gap-8">
            <div className="shrink-0">
              <h2 className="text-sm">{property.title}</h2>
              <p className="text-2xl font-medium">{location}</p>
            </div>
            <div className="shrink-0">
              <p className="text-sm text-right">{transactionTypeLabel}</p>
              {property.priceVisible ? (
                <p className="text-2xl highlight">{price}</p>
              ) : (
                <p>'Preço Sob Consulta'</p>
              )}
            </div>
          </div>
          <div className="flex gap-8 items-end">
            <div className="flex text-xs gap-4">
              {property.usableArea && (
                <span className="flex items-center gap-1">
                  <ExpandIcon className="size-4" strokeWidth={1.5} /> {property.usableArea}
                </span>
              )}
              {property.bedrooms && (
                <span className="flex items-center gap-1">
                  <BedIcon className="size-4" strokeWidth={1.5} />
                  {property.bedrooms} Quartos
                </span>
              )}
              {property.wc && (
                <span className="flex items-center gap-1">
                  <BathIcon className="size-4" strokeWidth={1.5} />
                  {property.wc} WC
                </span>
              )}
            </div>
            {consultant.imageUrl && (
              <Image
                height={48}
                width={48}
                src={consultant.imageUrl}
                alt={consultant.name}
                className="rounded-full size-12 object-cover"
              />
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
