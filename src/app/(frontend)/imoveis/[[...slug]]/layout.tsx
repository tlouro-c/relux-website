import Container from '@/components/Container'
import PropertiesFilters from '@/components/Property/PropertiesFilters'
import MobileFiltersToggle from '@/components/Property/MobileFiltersToggle'
import React from 'react'

type Params = Promise<{ slug?: string[] }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function PropertiesIndexLayout(props: {
  params: Params
  searchParams: SearchParams
  children: React.ReactNode
}) {
  return (
    <>
      <section className="pt-[var(--header-height)] flex flex-col justify-center items-center">
        <Container>
          <h1 className="text-4xl md:text-6xl mx-auto w-fit font-bold highlight leading-tight my-4 md:my-8">
            <span className="block md:pe-48">Coleção</span>{' '}
            <span className="block text-lg text-center">de</span>{' '}
            <span className="block md:ps-48">Imóveis</span>
          </h1>
        </Container>
      </section>
      <section className="pb-20">
        <Container className="max-w-[1400px] md:flex md:flex-row relative gap-4">
          {/* Desktop Filters - sidebar on desktop */}
          <div className="hidden min-w-fit max-w-fit shrink-0 md:flex md:flex-1 sticky top-[calc(var(--header-height)+24px)] h-[calc(100vh-var(--header-height)-48px)] overflow-y-auto">
            <PropertiesFilters params={props.params} />
          </div>

          <div
            data-properties-grid
            className="flex-1 md:flex-[2] lg:flex-[3] flex flex-col gap-4 min-h-[calc(100vh-var(--header-height)-48px)]"
          >
            {props.children}
          </div>
        </Container>
      </section>

      {/* Mobile Filter Toggle Menu */}
      <MobileFiltersToggle>
        <PropertiesFilters params={props.params} />
      </MobileFiltersToggle>
    </>
  )
}
