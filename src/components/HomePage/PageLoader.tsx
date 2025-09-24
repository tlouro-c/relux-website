'use client'

import { motion } from 'motion/react'
import React from 'react'

export default function PageLoader() {
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-screen h-dvh z-[999] bg-black/40"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    />
  )
}
