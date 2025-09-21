'use client'

import React from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LenisOptions } from 'lenis'

export function LenisScrollReset() {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true })
  }, [lenis, pathname])

  return null
}

function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisOptions: LenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothWheel: true,
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
