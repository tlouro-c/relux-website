import CtaSection from '@/components/HomePage/TestimonialsSection'
import Hero from '@/components/HomePage/Hero'
import InstagramSection from '@/components/HomePage/IntagramSection'
import LocationsSection from '@/components/HomePage/LocationsSection'
import MetricsSection from '@/components/HomePage/MetricsSection'
import MissionSection from '@/components/HomePage/MissionSection'
import PageLoader from '@/components/HomePage/PageLoader'
import ServicesSection from '@/components/HomePage/ServicesSection'
import React from 'react'
import { LenisScrollReset } from '@/components/LenisProvider'

export default function Homepage() {
  return (
    <>
      <style>{`
        :root {
          --header-color: var(--background);
        }
      `}</style>
      <PageLoader />
      <Hero />
      <div className="relative bg-background">
        <MetricsSection />
        <LocationsSection />
        <MissionSection />
        <ServicesSection />
        <CtaSection />
        <InstagramSection />
      </div>
    </>
  )
}
