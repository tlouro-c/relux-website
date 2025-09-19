'use client'

import React from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function LenisScrollReset() {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [lenis, pathname])

  return null
}

function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false,
    smooth: true,
    prevent: (target: Element) => target.hasAttribute('data-lenis-prevent'),
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisScrollReset />
      {children}
    </ReactLenis>
  )
}

export default LenisProvider
