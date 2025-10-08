import Container from '@/components/Container'
import PropertiesFilters, { sortOptions } from '@/components/Property/PropertiesFilters'
import MobileFiltersToggle from '@/components/Property/MobileFiltersToggle'
import React from 'react'
import { SidebarProvider } from '@/components/Property/SidebarContext'
import ToggleSidebarButton from '@/components/Property/ToggleSidebarButton'
import { ClearFiltersButton, SortSelect } from '@/components/Property/PropertiesFiltersClient'

type Params = Promise<{ slug?: string[] }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function PropertiesIndexLayout(props: {
  params: Params
  searchParams: SearchParams
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <section className="pt-[calc(var(--header-height)+theme(spacing.8))] flex flex-col justify-center items-center">
        <Container className="sr-only">
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
          <PropertiesFilters className="hidden md:flex" params={props.params} />

          <div
            data-properties-grid
            className="flex-1 md:flex-[2] lg:flex-[3] flex flex-col gap-4 min-h-[calc(100vh-var(--header-height)-48px)]"
          >
            <div className="justify-between flex py-2">
              <div className="flex items-center gap-4">
                <ClearFiltersButton />
                <SortSelect sortOptions={sortOptions} />
              </div>
              <div className="hidden md:block">
                <ToggleSidebarButton />
              </div>
            </div>
            {props.children}
          </div>
        </Container>
      </section>

      {/* Mobile Filter Toggle Menu */}
      <MobileFiltersToggle>
        <PropertiesFilters
          className="md:hidden !max-w-none !min-w-full h-fit"
          params={props.params}
        />
      </MobileFiltersToggle>
    </SidebarProvider>
  )
}
