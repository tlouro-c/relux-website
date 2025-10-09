import React from 'react'
import { Property } from '@/payload-types'
import { propertyTypesMap } from '@/collections/Properties'
import PropertyContentNav from './PropertyContentNav'

interface PropertyContentProps {
  property: Property
}

export default function PropertyContent({ property }: PropertyContentProps) {
  return (
    <div className="lining-nums">
      <PropertyContentNav hasVirtualTour={!!property.virtualTourUrl} />
      <div id="overview" className="my-24">
        <h2 className="text-2xl md:text-3xl mt-auto font-bold line-split-animation mb-8">
          Informações Gerais
        </h2>
        <h3 className="text-balance font-bold tracking-tight mb-2">Descrição</h3>
        <p className="leading-relaxed mb-8 line-split-animation">{property.description}</p>
        <ul>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Tipo de Imóvel</h3>
            <p className="flex-1">{propertyTypesMap[property.propertyType]}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Referência</h3>
            <p className="flex-1">{property.reference}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Localização</h3>
            <p className="flex-1">
              {property.address}, {property.postalCode}, {property.county}, {property.district}
            </p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Estado</h3>
            <p className="flex-1">{property.status}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Ano de Construção</h3>
            <p className="flex-1">{property.year}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Transação</h3>
            <p className="flex-1">{property.transactionType === 'rent' ? 'Arrendar' : 'Comprar'}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Preço</h3>
            <p className="flex-1">{property.price}</p>
          </li>
        </ul>
      </div>

      <div id="spaces">
        <h2 className="text-2xl md:text-3xl mt-auto font-bold line-split-animation mb-8">
          Áreas e Espaços
        </h2>
        <ul>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Área Útil</h3>
            <p className="flex-1">{property.usableArea}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Área Bruta</h3>
            <p className="flex-1">{property.grossArea}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Área do Terreno</h3>
            <p className="flex-1">{property.landArea}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Quartos</h3>
            <p className="flex-1">{property.bedrooms}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Casas de Banho</h3>
            <p className="flex-1">{property.wc}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">
              Lugares de Estacionamento
            </h3>
            <p className="flex-1">{property.parkingSpaces}</p>
          </li>
          <li className="py-6 border-t flex items-center justify-between">
            <h3 className="flex-1 text-balance font-bold tracking-tight">Certificado Energético</h3>
            <p className="flex-1">{property.energyCertificate}</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
