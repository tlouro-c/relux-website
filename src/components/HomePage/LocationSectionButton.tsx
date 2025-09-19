'use client'

import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { slugify } from '@/utilities/global'

function padNumber(num: number): string {
  return num.toString().padStart(2, '0')
}

export default function LocationSectionButton({
  index,
  children,
  location,
}: {
  index: number
  children: React.ReactNode
  location: string
}) {
  return (
    <li>
      <motion.button
        className={`flex justify-center w-full items-center gap-2 text-2xl font-medium highlight uppercase py-1 border-b border-foreground/10 ${index === 1 && 'border-t'}`}
        whileHover="hovered"
      >
        <span className="line-split-animation" data-delay={0.1 * (index - 1)}>
          {padNumber(index)}
        </span>
        <motion.div
          variants={{
            initial: { width: 0 },
            hovered: { width: 'auto' },
          }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden h-12 aspect-video w-0 pointer-events-none"
        >
          <Image
            src={`/images/districts/${slugify(location)}.png`}
            height={48}
            width={86}
            alt={location}
            className="aspect-video object-cover absolute left-0 top-0 h-12 block"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </motion.div>

        <span className="line-split-animation" data-delay={0.1 * (index - 1) + 0.1}>
          {children}
        </span>
      </motion.button>
    </li>
  )
}
