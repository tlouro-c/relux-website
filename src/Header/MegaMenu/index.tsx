'use client'

import { useLenis } from 'lenis/react'
import { useMegaMenu } from '@/contexts/MegaMenuContext'
import { motion } from 'motion/react'
import React, { useEffect } from 'react'
import { Header } from '@/payload-types'
import { Button } from '@/components/Button'
import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'
import { ReluxIcon } from '@/components/ReluxIcon'
import Container from '@/components/Container'
import { ElementFadeIn } from '@/components/Animations/ElementFadeIn'
import { useRouter } from 'next/navigation'

export default function MegaMenu({ data }: { data: Header }) {
  const { isOpen, toggleMenu } = useMegaMenu()
  const lenis = useLenis()
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [isOpen, lenis])

  const handleHomeIconClick = () => {
    if (isOpen) {
      toggleMenu()
    }
    setTimeout(() => router.push('/#'), 500)
  }

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isOpen ? 0 : '-100%' }}
      transition={{
        duration: 1,
        ease: [0.645, 0.045, 0.355, 1],
      }}
      className={`fixed top-0 left-0 h-svh w-screen flex flex-col justify-between bg-foreground z-40 ${!isOpen ? 'pointer-events-none' : ''}`}
    >
      <div className="flex-1 px-4 md:px-6 text-background">
        <div className="h-[var(--header-height)] flex items-center">
          <button onClick={handleHomeIconClick} className="hidden md:flex items-center">
            <ElementRevealFromBottom once={false}>
              <ReluxIcon className="size-12" />
            </ElementRevealFromBottom>
            <div className="ml-3 font-bold text-3xl overflow-hidden hidden md:block">
              <ElementRevealFromBottom once={false}>
                <span>Relux</span>
              </ElementRevealFromBottom>
            </div>
          </button>
        </div>
      </div>
      <nav className="flex-1 flex flex-col items-start justify-center">
        <ul>
          {data?.navItems?.map((item, index) => {
            return (
              <li key={item.link.label} className="relative overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: isOpen ? 0 : '100%' }}
                  style={{ willChange: 'transform', y: isOpen ? 0 : '100%' }}
                  transition={{
                    duration: 1,
                    ease: [0.645, 0.045, 0.355, 1],
                    delay: (index + 1) * 0.0625 + 0.2,
                  }}
                >
                  <Button
                    href={item.link.url || '#'}
                    target={`${item.link.newTab ? '_blank' : '_self'}`}
                    rel={`${item.link.newTab ? 'noopener noreferrer' : ''}`}
                    variant="link"
                    size="link"
                    className="text-5xl md:text-6xl text-background"
                  >
                    {item.link.label}
                  </Button>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </nav>
      <ElementFadeIn
        once={false}
        delay={0.4}
        className="flex-1 pb-2 flex items-end justify-between text-background"
      >
        <Container className="max-w-none grid grid-cols-2 gap-y-4 md:flex items-end justify-between text-sm font-semibold">
          <p className="py-2 order-3 md:order-none">© {new Date().getFullYear()} Relux Portugal</p>

          <ul className="flex flex-col order-1 md:order-none" aria-label="Redes Sociais">
            <li>
              <Button
                href="https://www.instagram.com/reluxportugal/"
                rel="noopener noreferrer"
                target="_blank"
                size={'link'}
                variant={'link'}
                className="font-semibold px-0 md:px-4 py-1"
              >
                Instagram
              </Button>
            </li>
            <li>
              <Button
                href="https://www.facebook.com/reluxportugal/"
                rel="noopener noreferrer"
                target="_blank"
                size={'link'}
                variant={'link'}
                className="font-semibold px-0 md:px-4 py-1"
              >
                Facebook
              </Button>
            </li>
            <li>
              <Button
                href="https://www.linkedin.com/company/reluxpt"
                rel="noopener noreferrer"
                target="_blank"
                size={'link'}
                variant={'link'}
                className="font-semibold px-0 md:px-4 py-1"
              >
                LinkedIn
              </Button>
            </li>
          </ul>

          <ul
            className="flex flex-col items-end md:items-start order-2 md:order-none"
            aria-label="Legal"
          >
            <li>
              <Button size={'link'} variant={'link'} className="font-semibold px-0 md:px-4 py-1">
                Termos e Condições
              </Button>
            </li>
            <li>
              <Button size={'link'} variant={'link'} className="font-semibold px-0 md:px-4 py-1">
                Livro de Reclamações
              </Button>
            </li>
          </ul>
          <Button
            href="https://hazelsw.com"
            target="_blank"
            rel="noopener"
            size={'link'}
            variant={'link'}
            className="font-semibold order-4 md:order-none px-0 md:px-4 w-fit md:w-auto ms-auto md:ms-0 py-1"
          >
            Website: Hazel
          </Button>
        </Container>
      </ElementFadeIn>
    </motion.div>
  )
}
