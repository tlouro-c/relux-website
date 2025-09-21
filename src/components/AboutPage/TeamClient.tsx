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
    <div className="relative mb-80">
      <div className="sticky top-1/2 h-0 flex justify-end overflow-visible">
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
          initial={{ scaleY: 1}}
          whileInView={{ scaleY: 0}}
          transition={{type: 'tween', duration: 1.2, ease: [0.645, 0.045, 0.355, 1], delay: 0.2}}
          viewport={{ once: true }}
          className="absolute inset-0 bg-background origin-bottom" />
        </div>
      </div>
      <ul className="flex flex-col w-full">
        {teamMembers.sort((a, b) => a.name.localeCompare(b.name)).map((member, index) => (
          <li
            key={index}
            className={`flex items-end gap-2 transition-colors duration-300 py-4 ${
              selectedMember === index ? 'opacity-100' : 'opacity-20'
            }`}
            onMouseEnter={() => setSelectedMember(index)}
          >
            <span className="text-4xl font-semibold tracking-tighter line-split-animation">
              {member.name}
            </span>
            <span className="text-xs tracking-tight pb-0.5 line-split-animation">{member.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
