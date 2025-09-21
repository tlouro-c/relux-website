import { Consultant, Property } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import React from 'react'
import PropertyCard from './PropertyCard'
import PropertyCardWrapperClient from './PropertyCardWrapperClient'
import { SortOptionsType } from '@/app/(frontend)/imoveis/[[...slug]]/page'
import { fetchProperties } from '@/collections/Properties/utils/dataFetching'

type Params = Promise<{ slug?: string[] }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function PropertiesGrid(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { slug } = params
  const transactionType = ['comprar', 'arrendar'].includes(slug?.[0] || '') ? slug?.[0] : undefined
  const location = transactionType ? slug?.[1] : slug?.[0]
  const {
    quartos = -1,
    wc = -1,
    estacionamento = -1,
    ordenar = 'maisRecentes',
    page = 1,
  } = searchParams

  const properties = (
    await fetchProperties(
      transactionType,
      location,
      Number(quartos),
      Number(wc),
      Number(estacionamento),
      ordenar as SortOptionsType,
      Number(page),
    )
  ).docs

  if (properties.length === 0) {
    return (
      <>
        <div className="h-[calc(100vh-var(--header-height)-48px)] flex items-center justify-center">
          <p className="text-center text-xl highlight">
            Nenhum imóvel encontrado.<br/>Por favor, ajuste os filtros.
          </p>
        </div>
      </>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 min-h-[calc(100vh-var(--header-height)-48px)]">
      {[...properties, ...properties, ...properties, ...properties].map((property, index) => (
        <PropertyCardWrapperClient key={property.id + index} index={index}>
          <PropertyCard property={property} consultant={property.consultant as Consultant} />
        </PropertyCardWrapperClient>
      ))}
    </div>
  )
}
