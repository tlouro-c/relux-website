import PropertiesGrid from '@/components/Property/PropertiesGrid'
import React, { Suspense } from 'react'

type Params = Promise<{ slug?: string[] }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const sortOptions = [
  { value: 'maisRecentes', label: 'Mais Recentes' },
  { value: 'precoAsc', label: 'Preço: Menor para Maior' },
  { value: 'precoDesc', label: 'Preço: Maior para Menor' },
  { value: 'areaAsc', label: 'Área: Menor para Maior' },
  { value: 'areaDesc', label: 'Área: Maior para Menor' },
]
export type SortOptionsType = (typeof sortOptions)[number]['value']

export default function PropertiesIndex(props: { params: Params; searchParams: SearchParams }) {
  return (
    <>
      <Suspense>
        <PropertiesGrid {...props} />
      </Suspense>
    </>
  )
}
