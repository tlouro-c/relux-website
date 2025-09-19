'use client'

import { motion } from 'motion/react'
import React from 'react'

export default function PageLoader() {
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-[999]"
      initial={{ backdropFilter: 'blur(8px)' }}
      animate={{ backdropFilter: 'blur(0px)' }}
      transition={{
        duration: 1.2,
        ease: [0.645, 0.045, 0.355, 1],
        delay: 0.2,
      }}
    />
  )
}
