'use client'

import { Button } from '@/components/Button'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useTransition, useCallback, memo, useEffect } from 'react'

type FilterOption = {
  value: number
  label: string
}

type SortOption = {
  value: string
  label: string
}

export const ClearFiltersButton = memo(function ClearFiltersButton() {
  const router = useRouter()

  const clearFilters = useCallback(() => {
    router.push('/imoveis/comprar')
  }, [router])

  return (
    <button
      onClick={clearFilters}
      className="text-xs text-nowrap text-muted-foreground hover:text-foreground transition-colors"
    >
      Limpar Filtros
    </button>
  )
})

export const SortSelect = memo(function SortSelect({ sortOptions }: { sortOptions: SortOption[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (value === 'maisRecentes') {
        params.delete(key)
      } else {
        params.set(key, value)
      }

      const queryString = params.toString()
      const fullPath = queryString ? `${pathname}?${queryString}` : pathname

      router.push(fullPath, { scroll: false })
    },
    [searchParams, pathname, router],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateFilter('ordenar', e.target.value)
    },
    [updateFilter],
  )

  return (
    <select
      value={searchParams.get('ordenar') || 'maisRecentes'}
      onChange={handleChange}
      className="text-xs bg-transparent w-full md:w-36 line-clamp-1 text-muted-foreground hover:text-foreground border border-accent/20 rounded px-2 py-1 outline-none"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value} className="bg-background text-foreground">
          {option.label}
        </option>
      ))}
    </select>
  )
})

export const LocationSearch = memo(function LocationSearch({
  initialLocation,
  transactionType,
}: {
  initialLocation: string
  transactionType?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [locationValue, setLocationValue] = useState(initialLocation)
  const [, startTransition] = useTransition()

  // Sync local state with prop changes (e.g., navigation)
  useEffect(() => {
    setLocationValue(initialLocation)
  }, [initialLocation])

  const updateLocation = useCallback(() => {
    const params = new URLSearchParams(searchParams)

    const slug = []
    if (transactionType && transactionType !== 'todos') slug.push(transactionType)
    if (locationValue.trim()) slug.push(encodeURIComponent(locationValue.trim()))

    const basePath = slug.length > 0 ? `/imoveis/${slug.join('/')}` : '/imoveis'
    const queryString = params.toString()
    const fullPath = queryString ? `${basePath}?${queryString}` : basePath

    router.push(fullPath)
  }, [searchParams, transactionType, locationValue, router, startTransition])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') updateLocation()
    },
    [updateLocation],
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationValue(e.target.value)
  }, [])

  return (
    <div className="opacity-75 focus-within:opacity-100 transition duration-300">
      <input
        className="bg-transparent placeholder:text-muted-foreground border-b-foreground border-b-[1px] w-full outline-none text-sm pb-1 mb-3"
        type="text"
        placeholder="Distrito, Concelho..."
        value={locationValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={updateLocation} size="sm" className="w-full text-xs opacity-100">
        Aplicar
      </Button>
    </div>
  )
})

export const TransactionTypeButtons = memo(function TransactionTypeButtons({
  currentType,
  location,
}: {
  currentType?: string
  location?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const updateTransactionType = useCallback(
    (newType: string) => {
      const params = new URLSearchParams(searchParams)

      const slug = []
      if (newType !== 'todos') slug.push(newType)
      if (location && location.trim()) slug.push(encodeURIComponent(location.trim()))

      const basePath = slug.length > 0 ? `/imoveis/${slug.join('/')}` : '/imoveis'
      const queryString = params.toString()
      const fullPath = queryString ? `${basePath}?${queryString}` : basePath

      router.push(fullPath)
    },
    [searchParams, location, router, startTransition],
  )

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        onClick={() => updateTransactionType('comprar')}
        size="sm"
        variant={currentType === 'comprar' ? 'default' : 'secondary'}
        className="text-xs"
      >
        Comprar
      </Button>
      <Button
        onClick={() => updateTransactionType('arrendar')}
        size="sm"
        variant={currentType === 'arrendar' ? 'default' : 'secondary'}
        className="text-xs"
      >
        Arrendar
      </Button>
    </div>
  )
})

export const FilterButtons = memo(function FilterButtons({
  options,
  filterKey,
  gridCols = 4,
}: {
  options: FilterOption[]
  filterKey: string
  gridCols?: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: number) => {
      const params = new URLSearchParams(searchParams)

      if (value === 0) {
        params.delete(key)
      } else {
        params.set(key, value.toString())
      }

      const queryString = params.toString()
      const fullPath = queryString ? `${pathname}?${queryString}` : pathname

      router.push(fullPath, { scroll: false })
    },
    [searchParams, pathname, router],
  )

  return (
    <div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          option={option}
          filterKey={filterKey}
          updateFilter={updateFilter}
        />
      ))}
    </div>
  )
})

const FilterButton = memo(function FilterButton({
  option,
  filterKey,
  updateFilter,
}: {
  option: FilterOption
  filterKey: string
  updateFilter: (key: string, value: number) => void
}) {
  const searchParams = useSearchParams()
  const handleClick = useCallback(() => {
    updateFilter(filterKey, option.value)
  }, [updateFilter, filterKey, option.value])

  return (
    <button
      onClick={handleClick}
      className={`flex-1 text-xs py-2 px-2 rounded transition-all duration-300 lining-nums ${
        Number(searchParams.get(filterKey)) === option.value
          ? 'bg-foreground text-background'
          : 'bg-transparent border border-accent/20 text-foreground hover:border-accent/40'
      }`}
    >
      {option.label}
    </button>
  )
})
