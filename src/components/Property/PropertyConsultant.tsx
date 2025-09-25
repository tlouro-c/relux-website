import React from 'react'
import { Property, Consultant } from '@/payload-types'
import Image from 'next/image'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'
import { PhoneIcon, MailIcon, UserIcon } from 'lucide-react'

interface PropertyConsultantProps {
  property: Property
  consultant?: Consultant
}

export default function PropertyConsultant({ property, consultant }: PropertyConsultantProps) {
  const priceNumber =
    typeof property.price === 'string'
      ? parseFloat(property.price.replace(/\./g, '').replace(',', '.'))
      : Number(property.price)

  const price = priceNumber.toLocaleString('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })

  const transactionTypeLabel = property.transactionType === 'rent' ? 'Arrendar' : 'Comprar'

  return (
    <ElementRevealFromBottom delay={0.6}>
      <div className="space-y-6">
        {/* Price Summary Card */}
        <div className="bg-card border border-border rounded p-6 space-y-4">
          <div className="text-center">
            {property.priceVisible ? (
              <p className="text-2xl md:text-3xl font-light highlight">
                {price}
              </p>
            ) : (
              <p className="text-2xl md:text-3xl font-light highlight">
                Preço Sob Consulta
              </p>
            )}
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
              {transactionTypeLabel}
            </p>
          </div>

          {/* Quick Property Facts */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            {property.bedrooms && property.bedrooms > 0 && (
              <div className="text-center">
                <p className="text-lg font-semibold">{property.bedrooms}</p>
                <p className="text-xs text-muted-foreground font-medium">Quartos</p>
              </div>
            )}
            {property.wc && property.wc > 0 && (
              <div className="text-center">
                <p className="text-lg font-semibold">{property.wc}</p>
                <p className="text-xs text-muted-foreground font-medium">WC</p>
              </div>
            )}
            {property.usableArea && (
              <div className="text-center">
                <p className="text-lg font-semibold">
                  {typeof property.usableArea === 'string'
                    ? parseFloat(property.usableArea.replace(/\./g, '').replace(',', '.'))
                    : Number(property.usableArea)}
                </p>
                <p className="text-xs text-muted-foreground font-medium">m²</p>
              </div>
            )}
          </div>
        </div>

        {/* Consultant Information */}
        {consultant ? (
          <div className="bg-card border border-border rounded p-6 space-y-4">
            <h4 className="font-semibold text-center">Consultor Responsável</h4>

            <div className="flex flex-col items-center space-y-4">
              {consultant.imageUrl ? (
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <Image
                    src={consultant.imageUrl}
                    alt={consultant.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                  <UserIcon className="size-6 text-foreground" strokeWidth={1.5} />
                </div>
              )}

              <div className="text-center">
                <h5 className="font-semibold">{consultant.name}</h5>
                {consultant.description && (
                  <p className="text-sm text-muted-foreground mt-1 font-medium">
                    {consultant.description}
                  </p>
                )}
              </div>

              <div className="w-full space-y-3">
                {consultant.phone && (
                  <a
                    href={`tel:${consultant.phone}`}
                    className="flex items-center gap-3 w-full p-3 bg-secondary rounded hover:bg-muted transition-colors duration-300"
                  >
                    <PhoneIcon className="size-4 text-foreground" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{consultant.phone}</span>
                  </a>
                )}

                {consultant.email && (
                  <a
                    href={`mailto:${consultant.email}?subject=Interesse em ${property.title} - Ref: ${property.reference}`}
                    className="flex items-center gap-3 w-full p-3 bg-secondary rounded hover:bg-muted transition-colors duration-300"
                  >
                    <MailIcon className="size-4 text-foreground" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{consultant.email}</span>
                  </a>
                )}
              </div>

              {(consultant.phone || consultant.email) && (
                <button className="w-full bg-foreground text-background py-3 px-4 rounded hover:bg-foreground/90 transition-colors duration-300 font-semibold text-sm">
                  Contactar Consultor
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded p-6 space-y-4">
            <h4 className="font-semibold text-center">Informação de Contacto</h4>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground font-medium">
                Para mais informações sobre este imóvel
              </p>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Ref: {property.reference}</p>
                <button className="w-full bg-foreground text-background py-3 px-4 rounded hover:bg-foreground/90 transition-colors duration-300 font-semibold text-sm">
                  Contactar Agência
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Property Tags */}
        <div className="space-y-3">
          {property.isNew && (
            <span className="inline-block w-full text-center bg-success/10 text-success text-xs font-semibold px-3 py-2 rounded border border-success/20 uppercase tracking-wide">
              Novidade
            </span>
          )}
          {property.isFeatured && (
            <span className="inline-block w-full text-center bg-accent/10 text-accent text-xs font-semibold px-3 py-2 rounded border border-accent/20 uppercase tracking-wide">
              Destaque
            </span>
          )}
        </div>
      </div>
    </ElementRevealFromBottom>
  )
}