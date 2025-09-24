import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import Container from '@/components/Container'
import { Button } from '@/components/Button'
import { ReluxIcon } from '@/components/ReluxIcon'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="pt-16 pb-2 flex flex-col border-t border-t-secondary">
      <Container className="max-w-none flex flex-col-reverse md:flex-row justify-between gap-8 mb-8 md:mb-16">
        <div>
          <Link className="flex items-center mb-4" href="/#">
            <ReluxIcon className="size-16" />
          </Link>
          <div className="flex flex-col gap-1 text-sm tracking-tight">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Morada: </h3>
              <p>R. José de Sucena 239 R/C, 3750-157, Águeda</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Email: </h3>
              <p>info@relux.pt</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Telefone: </h3>
              <p>234 108 547</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Horário: </h3>
              <p>Segunda a Sexta: 09:00 - 18:00</p>
            </div>
          </div>
        </div>

        <nav>
          <ul className="flex flex-col md:items-end">
            {navItems.map(({ link }, i) => (
              <li key={link.label}>
                <Button
                  className="text-3xl font-semibold tracking-tighter ps-0 md:ps-4 py-1"
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
    </footer>
  )
}
