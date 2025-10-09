import React from 'react'
import { Property, Consultant } from '@/payload-types'
import Image from 'next/image'
import ConsultantReachOutButton from './ConsultantReachOutButton'
import Link from 'next/link'
import InlineCal from './InlineCal'

interface PropertyPageSidebarProps {
  property: Property & { consultant?: Consultant }
}

export default function PropertyPageSidebar({ property }: PropertyPageSidebarProps) {
  return (
    <div className="sticky top-0 pt-[calc(var(--header-height)+theme(spacing.8))] space-y-8">
      <div
        className="bg-white rounded-xl border border-accent/10 overflow-hidden h-[calc(100svh_-_var(--header-height)-theme(spacing.16))] flex flex-col"
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
        }}
      >
        <h2 className="text-3xl text-balance font-bold tracking-tight p-6 text-center">
          Reserve uma Visita
        </h2>
        <InlineCal />
      </div>

      <span className="my-8 mx-auto block w-fit text-sm text-muted-foreground"> Ou </span>

      <div
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
        }}
        className=" relative bg-white rounded-xl p-6 border border-accent/10 overflow-hidden"
      >
        <h3 className="text-3xl text-balance font-bold tracking-tight mb-8 text-center">
          Fale Com o Consultor
        </h3>
        <div className="flex">
          <div className="flex-1 shrink-0">
            <div className="aspect-[2/3] bg-foreground relative rounded-xl overflow-hidden">
              {property.consultant?.imageUrl && (
                <Image
                  src={property.consultant.imageUrl}
                  alt={property.consultant.name}
                  className="object-cover w-full h-full"
                  sizes="250px"
                  height={0}
                  width={0}
                />
              )}
            </div>
          </div>

          <div className="flex-[2] ps-6 flex flex-col justify-center gap-4 items-center min-h-full">
            <h4 className="text-lg font-medium">
              <Link href={`/consultor/${property.consultant?.slug}`}>
                {property.consultant?.name}
              </Link>
            </h4>
            <ConsultantReachOutButton property={property} />
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col items-center relative bg-secondary rounded-xl p-6 border border-accent/10 overflow-hidden">
        <h3 className="text-lg font-semibold mb-2 text-balance text-center">Agende uma visita</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center text-pretty">
          Veja os horários disponíveis e reserve o seu.
        </p>
        <Button
          size={'sm'}
          variant={'accent'}
          data-cal-namespace="30min"
          data-cal-link="tomas-correia/30min"
          data-cal-config='{"layout":"month_view"}'
        >
          Agendar agora <CalendarIcon />
        </Button>
      </div> */}
    </div>
  )
}
