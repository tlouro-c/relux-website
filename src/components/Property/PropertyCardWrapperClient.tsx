'use client'

import { motion } from 'motion/react'
import React from 'react'

export default function PropertyCardWrapperClient({
  children,
  index = 0,
}: {
  children: React.ReactNode
  index?: number
}) {
  return (
    <motion.div
      className="overflow-hidden origin-bottom"
      initial={{ opacity: 0, }}
      animate={{ opacity: 1, }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.645, 0.045, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
