import {
  ClearFiltersButton,
  FilterButtons,
  LocationSearch,
  SortSelect,
  TransactionTypeButtons,
} from './PropertiesFiltersClient'

export const bedroomOptions = [
  { value: 0, label: 'T0' },
  { value: 1, label: 'T1' },
  { value: 2, label: 'T2' },
  { value: 3, label: 'T3' },
  { value: 4, label: 'T4+' },
]

export const wcOptions = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3+' },
]

export const garageOptions = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2+' },
]

export const sortOptions = [
  { value: 'maisRecentes', label: 'Mais Recentes' },
  { value: 'precoAsc', label: 'Preço: Menor ⟶ Maior' },
  { value: 'precoDesc', label: 'Preço: Maior ⟶ Menor' },
  { value: 'areaAsc', label: 'Área: Menor ⟶ Maior' },
  { value: 'areaDesc', label: 'Área: Maior ⟶ Menor' },
]

type Params = Promise<{ slug?: string[] }>

export default async function PropertiesFilters({ params: ParamsPromise }: { params: Params }) {
  const params = await ParamsPromise
  const { slug } = params
  const transactionType = ['comprar', 'arrendar'].includes(slug?.[0] || '') ? slug?.[0] : undefined
  const location = transactionType ? slug?.[1] : slug?.[0]

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Top Row - Clear Filters & Order By */}
      <div className="flex justify-between gap-4 items-center mb-6">
        <ClearFiltersButton />
        <SortSelect sortOptions={sortOptions} />
      </div>

      {/* Search - Compact Hero Style */}
      <div className="mb-8">
        <p className="text-xs mb-2 line-split-animation">Pesquisar</p>
        <LocationSearch initialLocation={location || ''} transactionType={transactionType} />
      </div>

      {/* Transaction Type - Compact Buttons */}
      <div className="mb-8">
        <p className="text-xs mb-2 line-split-animation">Tipo</p>
        <TransactionTypeButtons currentType={transactionType} location={location} />
      </div>

      <div className="flex-1 space-y-6 min-h-0 overflow-y-auto">
        {/* Bedrooms */}
        <div>
          <p className="text-xs mb-2 line-split-animation">Quartos</p>
          <FilterButtons options={bedroomOptions} filterKey="quartos" />
        </div>

        {/* WC */}
        <div>
          <p className="text-xs mb-2 line-split-animation">WC</p>
          <FilterButtons options={wcOptions} filterKey="wc" />
        </div>

        {/* Garages */}
        <div>
          <p className="text-xs mb-2 line-split-animation">Lugares de Estacionamento</p>
          <FilterButtons options={garageOptions} filterKey="estacionamento" />
        </div>
      </div>
    </div>
  )
}
