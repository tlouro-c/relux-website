import React from 'react'
import { Property, Consultant } from '@/payload-types'
import Image from 'next/image'
import { PhoneIcon, MailIcon, UserIcon } from 'lucide-react'
import { Button } from '../Button'

interface PropertyPageSidebarProps {
  property: Property & { consultant?: Consultant }
  price: string
  transactionTypeLabel: string
  area: number
}

export default function PropertyPageSidebar({
  property,
  price,
  transactionTypeLabel,
  area,
}: PropertyPageSidebarProps) {
  return (
    <div className="sticky top-[calc(var(--header-height)+2rem)] space-y-6">
      {/* Price Card */}
      <div className="bg-secondary rounded p-6 border border-accent/5">
        <div className="text-center pb-6 border-b-[0.5px] border-foreground">
          {property.priceVisible ? (
            <p className="text-2xl md:text-3xl font-light highlight mb-1">{price}</p>
          ) : (
            <p className="text-2xl md:text-3xl font-light highlight mb-1">Preço Sob Consulta</p>
          )}
          <p className="text-sm tracking-tight">{transactionTypeLabel}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center pt-6">
          {property.bedrooms && property.bedrooms > 0 && (
            <div>
              <p className="text-2xl font-semibold">{property.bedrooms}</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Quartos
              </p>
            </div>
          )}
          {property.wc && property.wc > 0 && (
            <div>
              <p className="text-2xl font-semibold">{property.wc}</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                WC
              </p>
            </div>
          )}
          {property.usableArea && area > 0 && (
            <div>
              <p className="text-2xl font-semibold">{area}</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                m²
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Consultant Card */}
      <div className="bg-secondary rounded p-6 border border-accent/5">
        <h3 className="text-sm font-semibold mb-4 text-center">Consultor Responsável</h3>

        {property.consultant ? (
          <div className="flex flex-col items-center space-y-4">
            {property.consultant.imageUrl ? (
              <div className="w-16 h-16 relative rounded-full overflow-hidden">
                <Image
                  src={property.consultant.imageUrl}
                  alt={property.consultant.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center">
                <UserIcon className="size-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
            )}

            <div className="text-center">
              <h4 className="font-semibold">{property.consultant.name}</h4>
              {property.consultant.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {property.consultant.description}
                </p>
              )}
            </div>

            <div className="w-full space-y-2">
              {property.consultant.email && (
                <Button
                  href={`mailto:${property.consultant.email}?subject=Interesse em ${property.title} - Ref: ${property.reference}`}
                  className="w-full rounded-lg"
                  variant={'secondary'}
                >
                  <MailIcon />
                  {property.consultant.email}
                </Button>
              )}

              {property.consultant.phone && (
                <Button href={`tel:${property.consultant.phone}`} className="w-full rounded-lg">
                  <PhoneIcon />
                  {property.consultant.phone}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto">
              <UserIcon className="size-6 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Para mais informações sobre este imóvel
              </p>
              <p className="text-sm font-semibold mb-4">Ref: {property.reference}</p>
              <button className="w-full bg-foreground text-background py-3 px-4 rounded hover:bg-foreground/90 transition-colors duration-300 font-semibold text-sm">
                Contactar Agência
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
