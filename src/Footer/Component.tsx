import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import Container from '@/components/Container'
import { Button } from '@/components/Button'
import { ReluxIcon } from '@/components/ReluxIcon'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="pt-16 pb-2 flex flex-col border-t border-t-secondary">
      <Container className="max-w-none flex justify-between mb-32">
        <div>
          <Link className="flex items-center mb-4" href="/#">
            <ReluxIcon className="size-16" colorVariant={1} />
          </Link>
          <div className="flex flex-col gap-2 text-sm tracking-tight">
            <div className="flex items-center gap-2">
              <h3 className="font-bold">Morada: </h3>
              <p className="font-medium">R. José de Sucena 239 R/C, 3750-157, Águeda</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">Email: </h3>
              <p className="font-medium">info@relux.pt</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">Telefone: </h3>
              <p className="font-medium">234 108 547</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">Horário: </h3>
              <p className="font-medium">Segunda a Sexta: 09:00 - 18:00</p>
            </div>
          </div>
        </div>

        <nav>
          <ul className="flex flex-col items-end gap-1">
            {navItems.map(({ link }, i) => (
              <li key={link.label}>
                <Button
                  className="text-4xl font-semibold tracking-tighter"
                  variant={'link'}
                  size={'link'}
                  href={link.url || '#'}
                  target={link.newTab ? '_blank' : '_self'}
                  rel={link.newTab ? 'noreferrer' : undefined}
                >
                  {link.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="max-w-none flex items-end justify-between text-sm font-semibold">
        <p className="py-2">© {new Date().getFullYear()} Relux Portugal</p>

        <ul className="flex flex-col" aria-label="Redes Sociais">
          <li>
            <Button
              href="https://www.instagram.com/reluxportugal/"
              rel="noopener noreferrer"
              target="_blank"
              size={'link'}
              variant={'link'}
              className="font-semibold"
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
              className="font-semibold"
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
              className="font-semibold"
            >
              LinkedIn
            </Button>
          </li>
        </ul>

        <ul className="flex flex-col" aria-label="Legal">
          <li>
            <Button size={'link'} variant={'link'} className="font-semibold">
              Termos e Condições
            </Button>
          </li>
          <li>
            <Button size={'link'} variant={'link'} className="font-semibold">
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
          className="font-semibold"
        >
          Design / Desenvolvimento: Hazel
        </Button>
      </Container>
    </footer>
  )
}
