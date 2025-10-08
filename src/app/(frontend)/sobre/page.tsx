import About from '@/components/AboutPage/About'
import Team from '@/components/AboutPage/Team'
import ValuesCarousel from '@/components/AboutPage/ValuesCarousel'
import React, { Suspense } from 'react'

export default function Sobre() {
  return (
    <>
      {/* <About /> */}
      <ValuesCarousel />
      <Suspense>
        <Team />
      </Suspense>
    </>
  )
}
