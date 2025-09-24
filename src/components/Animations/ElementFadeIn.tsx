'use client'

import React from 'react'
import { motion } from 'motion/react'

interface ElementFadeInProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export const ElementFadeIn = ({
  children,
  once = true,
  style,
  className = '',
  delay,
}: ElementFadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: once, amount: 0.5 }}
      transition={{
        duration: 1,
        delay: delay || 0,
        ease: [0.645, 0.045, 0.355, 1],
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
