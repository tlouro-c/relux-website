'use client'

import React from 'react'
import { Button } from '../Button'
import { ChevronDown, ChevronLeftIcon, ChevronsUpDownIcon, EyeIcon, XIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { Consultant, Property } from '@/payload-types'
import { ElementFadeIn } from '../Animations/ElementFadeIn'
import ElementRevealFromBottom from '../Animations/ElementRevealFromBottom'

export default function ConsultantReachOutButton({
  property,
}: {
  property: Property & { consultant?: Consultant }
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)} className="w-fit" variant="accent" size={'sm'}>
        Ver Contactos <ChevronsUpDownIcon />
      </Button>
      <motion.div
        className={`h-full w-full flex flex-col justify-center items-center gap-2 p-6 overflow-hidden absolute top-0 right-0 bg-black/50 backdrop-blur-lg z-10 rounded-xl ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: '0%' }}
        animate={{
          opacity: isOpen ? '100%' : '0%',
        }}
        transition={{
          duration: 0.5,
          ease: [0.645, 0.045, 0.355, 1],
        }}
      >
        {property.consultant?.email && (
          <ElementRevealFromBottom once={false}>
            <a
              href={`mailto:${property.consultant.email}?subject=Interesse em ${property.title} - Ref: ${property.reference}`}
              className="w-fit flex items-center gap-1 tracking-tight text-background font-medium text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {property.consultant.email}
            </a>
          </ElementRevealFromBottom>
        )}

        {property.consultant?.phone && (
          <ElementRevealFromBottom once={false} delay={0.1}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`tel:${property.consultant.phone}`}
              className="w-fit flex items-center gap-1 tracking-tight text-background font-medium text-xl"
            >
              {property.consultant.phone}
            </a>
          </ElementRevealFromBottom>
        )}
        <button
          className="absolute top-6 right-6 text-background "
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="size-4" />
        </button>
      </motion.div>
    </>
  )
}
