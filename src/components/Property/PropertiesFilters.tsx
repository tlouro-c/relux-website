'use client'

import { use } from 'react'
import { FilterButtons, LocationSearch, TransactionTypeButtons } from './PropertiesFiltersClient'
import { motion } from 'motion/react'
import { useSidebar } from './SidebarContext'

export const bedroomOptions = [
  { value: 0, label: 'T0+' },
  { value: 1, label: 'T1+' },
  { value: 2, label: 'T2+' },
  { value: 3, label: 'T3+' },
]

export const wcOptions = [
  { value: 0, label: '0+' },
  { value: 1, label: '1+' },
  { value: 2, label: '2+' },
  { value: 3, label: '3+' },
]

export const garageOptions = [
  { value: 0, label: '0+' },
  { value: 1, label: '1+' },
  { value: 2, label: '2+' },
  { value: 3, label: '3+' },
]

export const propertyTypeOptions = [
  { value: 0, label: 'Qualquer' },
  { value: 1, label: 'Apartamento' },
  { value: 2, label: 'Moradia' },
  { value: 3, label: 'Terreno' },
  { value: 4, label: 'Comercial' },
  { value: 5, label: 'Outro' },
]

export const sortOptions = [
  { value: 'maisRecentes', label: 'Mais Recentes' },
  { value: 'precoAsc', label: 'Preço Crescente' },
  { value: 'precoDesc', label: 'Preço Decrescente' },
  { value: 'areaAsc', label: 'Área Crescente' },
  { value: 'areaDesc', label: 'Área Decrescente' },
]

type Params = Promise<{ slug?: string[] }>

export default function PropertiesFilters({
  params: paramsPromise,
  className = '',
}: {
  params: Params
  className?: string
}) {
  const params = use(paramsPromise)
  const { slug } = params
  const { isOpen } = useSidebar()
  const transactionType = ['comprar', 'arrendar'].includes(slug?.[0] || '') ? slug?.[0] : undefined
  const location = transactionType ? slug?.[1] : slug?.[0]

  return (
    <motion.div
      style={{ maxWidth: isOpen ? '100%' : 0, minWidth: isOpen ? 'fit-content' : 0 }}
      transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
      className={`shrink-0 md:flex md:flex-1 md:sticky md:top-[var(--header-height)] h-[calc(100vh-var(--header-height)-48px)] overflow-hidden ${className}`}
    >
      <div className="px-6 py-2 h-full flex flex-col w-full">
        <div className="mb-6">
          <TransactionTypeButtons currentType={transactionType} location={location} />
        </div>

        <div className="mb-6">
          <p className="text-xs mb-2">Pesquisar</p>
          <LocationSearch initialLocation={location || ''} transactionType={transactionType} />
        </div>

        <div className="mb-6">
          <p className="text-xs mb-2">Tipo de Imóvel</p>
          <FilterButtons options={propertyTypeOptions} filterKey="tipo" gridCols={3} />
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <p className="text-xs mb-2">Quartos</p>
            <FilterButtons options={bedroomOptions} filterKey="quartos" />
          </div>

          <div>
            <p className="text-xs mb-2">WC</p>
            <FilterButtons options={wcOptions} filterKey="wc" />
          </div>

          <div>
            <p className="text-xs mb-2">Lugares de Estacionamento</p>
            <FilterButtons options={garageOptions} filterKey="estacionamento" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
