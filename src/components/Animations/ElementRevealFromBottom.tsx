'use client'

import React from 'react'
import { motion } from 'motion/react'

export default function ElementRevealFromBottom({
  children,
  delay,
  once = true,
}: {
  children: React.ReactNode
  delay?: number
  once?: boolean
}) {
  const variants = {
    hidden: { y: '120%' },
    visible: { y: '0%' },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className="overflow-hidden"
    >
      <motion.div
        variants={variants}
        transition={{
          duration: 1,
          delay: delay || 0,
          ease: [0.645, 0.045, 0.355, 1],
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
