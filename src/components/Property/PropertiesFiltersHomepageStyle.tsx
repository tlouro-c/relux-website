'use client'

import { Button } from '@/components/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { SquareIcon } from 'lucide-react'

const bedroomOptions = [
  { value: '-1', label: 'Qualquer' },
  { value: '0', label: 'T0' },
  { value: '1', label: 'T1' },
  { value: '2', label: 'T2' },
  { value: '3', label: 'T3' },
  { value: '4', label: 'T4+' },
]

const wcOptions = [
  { value: '-1', label: 'Qualquer' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
]

const garageOptions = [
  { value: '-1', label: 'Qualquer' },
  { value: '0', label: 'Sem garagem' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
]

const sortOptions = [
  { value: 'maisRecentes', label: 'Mais Recentes' },
  { value: 'precoAsc', label: 'Preço: Menor ⟶ Maior' },
  { value: 'precoDesc', label: 'Preço: Maior ⟶ Menor' },
  { value: 'areaAsc', label: 'Área: Menor ⟶ Maior' },
  { value: 'areaDesc', label: 'Área: Maior ⟶ Menor' },
]

interface PropertiesFiltersProps {
  transactionType?: string
  location?: string
}

export default function PropertiesFiltersHomepageStyle({ transactionType, location }: PropertiesFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [locationValue, setLocationValue] = useState(location || '')
  const [selectedTransactionType, setSelectedTransactionType] = useState(transactionType || 'todos')
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.get('quartos') || '-1')
  const [selectedWc, setSelectedWc] = useState(searchParams.get('wc') || '-1')
  const [selectedGarages, setSelectedGarages] = useState(searchParams.get('garagens') || '-1')
  const [selectedSort, setSelectedSort] = useState(searchParams.get('ordenar') || 'maisRecentes')

  const updateURL = useCallback(() => {
    const params = new URLSearchParams()

    if (selectedBedrooms !== '-1') params.set('quartos', selectedBedrooms)
    if (selectedWc !== '-1') params.set('wc', selectedWc)
    if (selectedGarages !== '-1') params.set('garagens', selectedGarages)
    if (selectedSort !== 'maisRecentes') params.set('ordenar', selectedSort)

    const slug = []
    if (selectedTransactionType && selectedTransactionType !== 'todos') slug.push(selectedTransactionType)
    if (locationValue.trim()) slug.push(encodeURIComponent(locationValue.trim()))

    const basePath = slug.length > 0 ? `/imoveis/${slug.join('/')}` : '/imoveis'
    const queryString = params.toString()
    const fullPath = queryString ? `${basePath}?${queryString}` : basePath

    router.push(fullPath)
  }, [selectedTransactionType, locationValue, selectedBedrooms, selectedWc, selectedGarages, selectedSort, router])

  const clearFilters = () => {
    setLocationValue('')
    setSelectedTransactionType('todos')
    setSelectedBedrooms('-1')
    setSelectedWc('-1')
    setSelectedGarages('-1')
    setSelectedSort('maisRecentes')
    router.push('/imoveis')
  }

  const FilterButton = ({ isActive, onClick, children }: { isActive: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`text-left transition-all duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] ${
        isActive
          ? 'text-foreground opacity-100'
          : 'text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="py-20 px-8">
      {/* Search Input - Hero Style */}
      <div className="mb-16">
        <p className="section-badge text-accent mb-4">Pesquisar</p>
        <div className="opacity-75 focus-within:opacity-100 transition duration-300">
          <input
            className="bg-transparent placeholder:text-muted-foreground border-b-foreground border-b-[1.5px] w-full outline-none text-xl pb-2"
            type="text"
            placeholder="Distrito, Concelho, Código Postal..."
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && updateURL()}
          />
        </div>
      </div>

      {/* Transaction Type - Hero Button Style */}
      <div className="mb-16">
        <p className="section-badge text-accent mb-6">Tipo</p>
        <div className="space-x-3 flex">
          <Button
            size="sm"
            variant={selectedTransactionType === 'comprar' ? 'default' : 'secondary'}
            onClick={() => setSelectedTransactionType('comprar')}
          >
            Comprar <SquareIcon className="size-2 stroke-none fill-current" />
          </Button>
          <Button
            size="sm"
            variant={selectedTransactionType === 'arrendar' ? 'default' : 'secondary'}
            onClick={() => setSelectedTransactionType('arrendar')}
          >
            Arrendar <SquareIcon className="rotate-45 size-2 stroke-none fill-current" />
          </Button>
          <Button
            size="sm"
            variant={selectedTransactionType === 'todos' ? 'default' : 'ghost'}
            onClick={() => setSelectedTransactionType('todos')}
          >
            Todos
          </Button>
        </div>
      </div>

      {/* Bedrooms - Large Typography Style */}
      <div className="mb-16">
        <p className="section-badge text-accent mb-6">Quartos</p>
        <div className="space-y-2">
          {bedroomOptions.map((option) => (
            <FilterButton
              key={option.value}
              isActive={selectedBedrooms === option.value}
              onClick={() => setSelectedBedrooms(option.value)}
            >
              <span className="text-3xl font-medium tracking-tight">{option.label}</span>
            </FilterButton>
          ))}
        </div>
      </div>

      {/* WC */}
      <div className="mb-16">
        <p className="section-badge text-accent mb-6">Casas de Banho</p>
        <div className="space-y-2">
          {wcOptions.map((option) => (
            <FilterButton
              key={option.value}
              isActive={selectedWc === option.value}
              onClick={() => setSelectedWc(option.value)}
            >
              <span className="text-3xl font-medium tracking-tight">{option.label}</span>
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Garages */}
      <div className="mb-16">
        <p className="section-badge text-accent mb-6">Garagens</p>
        <div className="space-y-2">
          {garageOptions.map((option) => (
            <FilterButton
              key={option.value}
              isActive={selectedGarages === option.value}
              onClick={() => setSelectedGarages(option.value)}
            >
              <span className="text-3xl font-medium tracking-tight">{option.label}</span>
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Sort - Highlight Style */}
      <div className="mb-16">
        <p className="section-badge text-accent mb-6">Ordenar</p>
        <div className="space-y-3">
          {sortOptions.map((option) => (
            <FilterButton
              key={option.value}
              isActive={selectedSort === option.value}
              onClick={() => setSelectedSort(option.value)}
            >
              <span className={`text-2xl tracking-tight ${selectedSort === option.value ? 'highlight' : ''}`}>
                {option.label}
              </span>
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-accent/10 pt-8 space-y-4">
        <Button onClick={updateURL} className="w-full">
          Aplicar Filtros
        </Button>
        <button
          onClick={clearFilters}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  )
}