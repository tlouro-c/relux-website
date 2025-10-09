import { fetchPropertyByReference } from '@/collections/Properties/utils/dataFetching'
import Container from '@/components/Container'
import { notFound } from 'next/navigation'
import React from 'react'
import { Property, Consultant } from '@/payload-types'
import PropertyPageHero from '@/components/Property/PropertyPageHero'
import PropertyContent from '@/components/Property/PropertyContent'
import PropertyPageSidebar from '@/components/Property/PropertyPageSidebar'
import CalWidget from '@/components/Property/CalWidget'
import PropertyPageVideo from '@/components/Property/PropertyPageVideo'
import PropertyPageVirtualTour from '@/components/Property/PropertyPageVirtualTour'
import { HomeIcon } from 'lucide-react'
import { MortgageCalculator } from '@/components/Property/MortgageCalculator'

export default async function Imovel({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params

  const propertyDocs = await fetchPropertyByReference(reference)
  if (!propertyDocs || propertyDocs.totalDocs === 0) {
    notFound()
  }
  const property = propertyDocs.docs[0] as Property & {
    consultant?: Consultant
  }

  const location = property.county ? `${property.district}, ${property.county}` : property.district

  return (
    <>
      <CalWidget />
      <section className="pb-20">
        <PropertyPageHero property={property} location={location || ''} />
        <Container>
          <div className="flex py-8 lining-nums text-lg">
            <ul className="flex-1 space-y-4">
              <li className="flex items-center gap-4">
                <h3 className="flex-1 flex items-center gap-4 font-semibold">
                  <BedroomIcon /> Quartos
                </h3>
                <p className="flex-1 font-bold">{property.bedrooms}</p>
              </li>
              <li className="flex items-center gap-4">
                <h3 className="flex-1 flex items-center gap-4 font-semibold">
                  <BathroomIcon /> WC
                </h3>
                <p className="flex-1 font-bold">{property.wc}</p>
              </li>
              <li className="flex items-center gap-4">
                <h3 className="flex-1 flex items-center gap-4 font-semibold">
                  <GarageIcon /> Lugares
                </h3>
                <p className="flex-1 font-bold">{property.parkingSpaces}</p>
              </li>
            </ul>
            <ul className="flex-1 space-y-4">
              <li className="flex items-center gap-4">
                <h3 className="flex-1 flex items-center gap-4 font-semibold">
                  <AreaIcon /> Área Útil
                </h3>
                <p className="flex-1 font-bold">{property.usableArea}</p>
              </li>
              <li className="flex items-center gap-4">
                <h3 className="flex-1 flex items-center gap-4 font-semibold">
                  <AreaIcon /> Área Bruta
                </h3>
                <p className="flex-1 font-bold">{property.grossArea}</p>
              </li>
              <li className="flex items-center gap-4">
                <h3 className="flex-1 flex items-center gap-4 font-semibold">
                  <AreaIcon /> Área Terreno
                </h3>
                <p className="flex-1 font-bold">{property.landArea}</p>
              </li>
              <li className="flex items-center gap-4">
                <h3 className="flex-1 flex items-center gap-4 font-semibold">
                  <EnergyIcon /> Certificado Energético
                </h3>
                <p className="flex-1 font-bold">{property.energyCertificate}</p>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_480px]">
            <div>
              <PropertyContent property={property} />
              <PropertyPageVirtualTour property={property} />
            </div>
            <div>
              <PropertyPageSidebar property={property} />
            </div>
          </div>
          <PropertyPageVideo property={property} />

          <MortgageCalculator />
        </Container>
      </section>
    </>
  )
}

const BedroomIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    width={24}
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16.5 10h-2c-1.93 0-3.5 1.57-3.5 3.5v.5H6v-3a1 1 0 0 0-2 0v12a1 1 0 0 0 2 0h12a1 1 0 1 0 2 0v-9.5c0-1.93-1.57-3.5-3.5-3.5M13 13.5c0-.827.673-1.5 1.5-1.5h2c.827 0 1.5.673 1.5 1.5v.5h-5zM6 16h12v1h-3.5c-1.93 0-3.5 1.57-3.5 3.5v.5H6zm7 5v-.5c0-.827.673-1.5 1.5-1.5H18v2zm-4.5-8a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8.5 13m1.5 5.5a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 10 18.5m14-8.776V23a1 1 0 1 1-2 0V9.724c0-.999-.494-1.929-1.322-2.487l-7-4.724a2.99 2.99 0 0 0-3.356 0l-7 4.724A3 3 0 0 0 2 9.724V23a1 1 0 0 1-2 0V9.724C0 8.059.824 6.51 2.203 5.579l7-4.724a4.98 4.98 0 0 1 5.594 0l7 4.724A5 5 0 0 1 24 9.724"
    />
  </svg>
)

const BathroomIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    width={24}
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M19 12.5a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 19 12.5M22.5 9a1.5 1.5 0 1 0-.001-3.001A1.5 1.5 0 0 0 22.5 9m-5 7a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 17.5 16m5-5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 22.5 11m0 5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 22.5 16m0 5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 22.5 21m-5 0a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 17.5 21m-5-5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 12.5 16m0 5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 12.5 21m7.415-18.396a3.05 3.05 0 0 1-.812 2.883l-7.617 7.617a3.04 3.04 0 0 1-2.882.811 3 3 0 0 1-2.172-1.994 7.6 7.6 0 0 1-.352-1.787c-.239-3.224.046-5.635.833-7.216a5.3 5.3 0 0 0-2.997-.917 1.92 1.92 0 0 0-1.917 1.917v19.083a1 1 0 1 1-2 0V3.917A3.923 3.923 0 0 1 3.917 0a7.3 7.3 0 0 1 4.261 1.367C9.691.237 12.356-.202 16.133.08a7.5 7.5 0 0 1 1.788.353 3 3 0 0 1 1.994 2.171m-1.945.465a1 1 0 0 0-.67-.735 5.6 5.6 0 0 0-1.313-.259Q14.966 2 14.062 2c-2.419 0-4.167.4-4.915 1.147-.934.934-1.324 3.427-1.072 6.84.033.445.121.889.259 1.314.158.482.567.629.735.669.367.09.741-.018 1.003-.28l7.617-7.617a1.06 1.06 0 0 0 .28-1.004Z"
    />
  </svg>
)

const GarageIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}
  >
    <path
      fill="currentColor"
      d="M23.891 6.454a1 1 0 0 1-1.346.437L13.752 2.4a4.02 4.02 0 0 0-3.517.007l-8.78 4.48a1 1 0 0 1-.91-1.782L9.339.623a6.04 6.04 0 0 1 5.309-.007l8.807 4.493a1 1 0 0 1 .436 1.345m-1.813 6.666A7 7 0 0 1 23 16.594V18a4 4 0 0 1-2 3.463V22a2 2 0 0 1-4 0H7a2 2 0 0 1-4 0v-.537A4 4 0 0 1 1 18v-1.406a7 7 0 0 1 .922-3.474l2.058-3.6A5.01 5.01 0 0 1 8.321 7h7.358a5.01 5.01 0 0 1 4.341 2.52ZM3.723 14h16.554l-1.993-3.488A3.01 3.01 0 0 0 15.679 9H8.321a3.01 3.01 0 0 0-2.6 1.512ZM21 16.594a5 5 0 0 0-.036-.594H19v1a1 1 0 0 1-2 0v-1H7v1a1 1 0 0 1-2 0v-1H3.036a5 5 0 0 0-.036.594V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Z"
    />
  </svg>
)

const EnergyIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M22.294 5.027c-1.348.056-5.894.389-7.81 2.305a5.075 5.075 0 0 0-.901 5.93l.346.613A5.95 5.95 0 0 0 13 17.071V19c0 1.654-1.346 3-3 3s-3-1.346-3-3v-6h.5c1.93 0 3.5-1.57 3.5-3.5V6h1V4H9V0H7v4H5V0H3v4H0v2h1v3.5C1 11.43 2.57 13 4.5 13H5v6c0 2.757 2.243 5 5 5s5-2.243 5-5v-1.929c0-.64.166-1.249.447-1.803.814.459 1.738.734 2.641.724a5.08 5.08 0 0 0 3.583-1.479c2.549-3.173 2.16-7.117 2.363-9.555zM4.5 11C3.673 11 3 10.327 3 9.5V6h6v3.5c0 .827-.673 1.5-1.5 1.5zm15.76 2.096a3.09 3.09 0 0 1-3.504.595l-.018-.015 2.969-2.97-1.414-1.414-2.97 2.97-.01-.013a3.08 3.08 0 0 1 .589-3.506c1.104-1.104 4.229-1.573 6.053-1.695-.109 1.81-.565 4.918-1.694 6.047Z"
    />
  </svg>
)

const AreaIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <path
      d="M22.978 9.022a1 1 0 0 0 1-1V3.978a4 4 0 0 0-4-4h-4a1 1 0 0 0 0 2h4a2 2 0 0 1 .545.085L12 10.586 3.478 2.064A2 2 0 0 1 3.955 2H8a1 1 0 0 0 0-2H3.955a4 4 0 0 0-4 4v4a1 1 0 0 0 2 0V4a2 2 0 0 1 .085-.546L10.586 12l-8.551 8.551a2 2 0 0 1-.08-.529v-4.044a1 1 0 0 0-2 0v4.044a4 4 0 0 0 4 4h4a1 1 0 0 0 0-2h-4a2 2 0 0 1-.494-.069L12 13.414l8.506 8.506a2 2 0 0 1-.528.08h-4.045a1 1 0 0 0 0 2h4.045a4 4 0 0 0 4-4v-4a1 1 0 0 0-2 0v4a2 2 0 0 1-.07.494L13.414 12l8.5-8.5a2 2 0 0 1 .064.478v4.044a1 1 0 0 0 1 1"
      fill="currentColor"
    />
    <path
      fill="currentColor"
      d="M23 9a1 1 0 0 0 1-1V3a3 3 0 0 0-3-3h-5a1 1 0 0 0 0 2h4.586L12 10.586 3.414 2H8a1 1 0 0 0 0-2H3a3 3 0 0 0-3 3v5a1 1 0 0 0 2 0V3.414L10.586 12 2 20.586V16a1 1 0 0 0-2 0v5a3 3 0 0 0 3 3h5a1 1 0 0 0 0-2H3.414L12 13.414 20.586 22H16a1 1 0 0 0 0 2h5a3 3 0 0 0 3-3v-5a1 1 0 0 0-2 0v4.586L13.414 12 22 3.414V8a1 1 0 0 0 1 1"
    />
  </svg>
)
