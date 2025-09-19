'use client'

import React from 'react'
import { motion } from 'motion/react'

export default function ElementRevealFromBottom({
  children,
  delay,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{
          transform: 'translateY(100%)',
        }}
        whileInView={{
          transform: 'translateY(0)',
        }}
        transition={{
          duration: 1.2,
          delay: delay || 0,
          ease: [0.645, 0.045, 0.355, 1],
        }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  )
}
