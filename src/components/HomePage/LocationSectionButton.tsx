'use client'

import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { slugify } from '@/utilities/global'
import { useRouter, useSearchParams } from 'next/navigation'

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
  const searchParams = useSearchParams()

  const updateSearch = (district: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('distrito', slugify(district))

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, '', newUrl)
  }

  return (
    <li>
      <motion.button
        className={`flex justify-center w-full items-center gap-2 md:text-lg highlight capitalize py-1 border-b border-foreground/5 ${index === 1 && 'border-t'}`}
        whileHover="hovered"
        onClick={updateSearch.bind(null, location)}
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
          className="relative overflow-hidden h-10 md:h-12 aspect-video w-0 pointer-events-none"
        >
          <div className="aspect-video absolute left-0 top-0 h-12">
            <Image
              src={`/images/districts/${slugify(location)}.png`}
              height={0}
              width={0}
              sizes="86px"
              alt={location}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </motion.div>

        <span className="line-split-animation" data-delay={0.1 * (index - 1) + 0.1}>
          {children}
        </span>
      </motion.button>
    </li>
  )
}
