'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'
import { ReluxIcon } from '@/components/ReluxIcon'
import { Button } from '@/components/Button'
import { CircleIcon } from 'lucide-react'
import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const initialDelay = 0.6

  return (
    <nav className="flex gap-3 items-center justify-between h-full px-4 md:px-6 text-[hsl(var(--header-color))]">
      <div className="flex-1 flex justify-start items-center">
        <Link href="/" className="flex items-center">
          <ElementRevealFromBottom delay={initialDelay}>
            <ReluxIcon className="size-12" colorVariant={3} />
          </ElementRevealFromBottom>
          <div className="ml-3 font-bold text-3xl overflow-hidden hidden md:block">
            <ElementRevealFromBottom delay={initialDelay + 0.1}>
              <span>Relux</span>
            </ElementRevealFromBottom>
          </div>
        </Link>
      </div>
      <ul className="items-center justify-center gap-4 flex-1 hidden md:flex">
        {navItems.map(({ link }, i) => {
          return (
            <li key={link.label}>
              <ElementRevealFromBottom delay={initialDelay + 0.1 + i * 0.1}>
                <Button
                  variant={'link'}
                  size={'link'}
                  href={link.url || '#'}
                  target={`${link.newTab ? '_blank' : '_self'}`}
                  rel={`${link.newTab ? 'noopener noreferrer' : ''}`}
                  className="text-base"
                >
                  {link.label}
                </Button>
              </ElementRevealFromBottom>
            </li>
          )
        })}
      </ul>
      <div className="flex-1 flex justify-end items-center">
        <ElementRevealFromBottom delay={initialDelay + 0.2 + navItems.length * 0.1}>
          <Button variant={'secondary'}>
            Contactar um Consultor <CircleIcon className="size-1.5 fill-current" />
          </Button>
        </ElementRevealFromBottom>
      </div>
    </nav>
  )
}
