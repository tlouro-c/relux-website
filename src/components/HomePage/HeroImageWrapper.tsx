'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function HeroImageWrapper({ children }: { children: React.ReactNode }) {
  const target = React.useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({
    target,
  })

  const opacity = useTransform(scrollY, [0, 400], [0.45, 0.8])

  return (
    <div ref={target}>
      {children}
      <motion.div className="bg-black absolute inset-0" style={{ opacity }} />
    </div>
  )
}
