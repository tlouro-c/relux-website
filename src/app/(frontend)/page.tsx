import Hero from '@/components/HomePage/Hero'
import InstagramSection from '@/components/HomePage/InstagramSection'
import MetricsSection from '@/components/HomePage/MetricsSection'
import MissionSection from '@/components/HomePage/MissionSection'
import React from 'react'
import TestimonialsSection from '@/components/HomePage/TestimonialsSection'
import FeaturedPropertiesSection from '@/components/HomePage/FeaturedPropertiesSection'

export default function Homepage() {
  return (
    <>
      <style>{`
        :root {
          --header-color: var(--background);
        }
      `}</style>
      <Hero />
      <div className="relative bg-background rounded-t-xl">
        <MetricsSection />
        <FeaturedPropertiesSection />
        <MissionSection />
        {/* <ServicesSection /> */}
        <TestimonialsSection />
        <InstagramSection />
      </div>
    </>
  )
}
