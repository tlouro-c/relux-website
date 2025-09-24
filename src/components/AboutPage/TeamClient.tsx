'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'

const teamMembers = [
  {
    name: 'Antonio Santos',
    image: '/images/about/team/antonio-santos.png',
    role: 'Consultor',
  },
  {
    name: 'Francisca Santos',
    image: '/images/about/team/francisca-santos.png',
    role: 'Consultora',
  },
  {
    name: 'Francisco Ferreira',
    image: '/images/about/team/francisco-ferreira.png',
    role: 'CEO & Fundador',
  },
  {
    name: 'Sonia Miranda',
    image: '/images/about/team/sonia-miranda.png',
    role: 'Diretora Comercial',
  },
  { name: 'Teresa Silva', image: '/images/about/team/teresa-silva.png', role: 'Consultora' },
]

export default function TeamClient() {
  const [selectedMember, setSelectedMember] = React.useState<number | null>(0)

  return (
    <div className="relative mb-20 md:mb-40">
      <div className="sticky top-1/2 h-0 justify-end overflow-visible hidden md:flex">
        <div className="w-[200px] h-[300px] -translate-y-1/2 overflow-hidden relative">
          <Image
            src={teamMembers[selectedMember ?? 0].image}
            alt={teamMembers[selectedMember ?? 0].name}
            height={0}
            width={0}
            sizes="33vw"
            className="object-cover w-full h-full"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            transition={{ type: 'tween', duration: 1, ease: [0.645, 0.045, 0.355, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-background origin-bottom"
          />
        </div>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-1 w-full gap-x-4 gap-y-4 md:gap-y-0">
        {teamMembers
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((member, index) => (
            <li key={index} onMouseEnter={() => setSelectedMember(index)}>
              <div>
                <Image
                  src={member.image}
                  alt={member.name}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="object-cover w-full h-auto md:hidden aspect-[2/3]"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-end md:gap-2 transition-colors duration-300 py-2">
                <span className="text-lg md:text-4xl font-semibold tracking-tighter line-split-animation !text-nowrap">
                  {member.name}
                </span>
                <span className="text-xs tracking-tight pb-0.5 line-split-animation">
                  {member.role}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
