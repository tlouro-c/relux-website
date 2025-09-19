import React from 'react'
import Container from '../Container'
import { Button } from '../Button'
import { MoveUpRightIcon } from 'lucide-react'
import ElementRevealFromBottom from '../Animations/ElementRevealFromBottom'
import Image from 'next/image'

export default function InstagramSection() {
  const posts = [
    {
      src: '/images/ig/recrutamento-imobiliario.png',
      alt: 'Sentes que tens potencial, mas ainda não encontraste o lugar certo para o provar?',
      href: 'https://www.instagram.com/p/DN-ZND9iMFh/',
    },
    {
      src: '/images/ig/checklist-vender-casa-rapido.png',
      alt: 'Quer vender a sua casa em menos de 90 dias?',
      href: 'https://www.instagram.com/p/DNipn7EoXZc/',
    },
    {
      src: '/images/ig/pagar-menos-imi.png',
      alt: 'Podes estar a pagar IMI a mais sem saber!',
      href: 'https://www.instagram.com/p/DKaBtThoEk3/',
    },
    {
      src: '/images/ig/como-comprar-casa.png',
      alt: 'Comprar casa está a parecer mais difícil do que devia?',
      href: 'https://www.instagram.com/p/DJFWCD8o_XQ/',
    },
    {
      src: '/images/ig/herancas-nao-pagam-impostos.png',
      alt: 'Desde Abril de 2025, a venda da tua parte numa herança indivisa já não paga imposto de mais-valias.',
      href: 'https://www.instagram.com/p/DObY_YBiKxQ/',
    },
  ]

  return (
    <section className="py-20 overflow-hidden">
      <Container>
        <header className="flex justify-between items-center mb-16">
          <div>
            <p className="section-badge">Instagram</p>
            <h2 className="section-title line-split-animation">Acompanhe-nos pelo Instagram</h2>
          </div>
          <ElementRevealFromBottom delay={0.1}>
            <Button
              href="https://www.instagram.com/reluxportugal/"
              target="_blank"
              rel="noopener noreferrer"
              variant={'accent'}
              size={'sm'}
            >
              @reluxportugal <MoveUpRightIcon />
            </Button>
          </ElementRevealFromBottom>
        </header>
      </Container>

      <div className="overflow-hidden w-full">
        <div className="instagram-carousel-track">
          {[...posts, ...posts].map((post, index) => (
            <InstagramPost key={index} src={post.src} alt={post.alt} href={post.href} />
          ))}
        </div>
      </div>
    </section>
  )
}

function InstagramPost({ src, alt, href }: { src: string; alt: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block min-w-[300px] px-4">
      <div className="shrink-0 aspect-[3/4] w-full overflow-hidden rounded-lg bg-foreground">
        <Image
          src={src}
          alt={alt}
          height={0}
          width={0}
          sizes="30vw"
          className="w-full h-full object-top object-cover"
        />
      </div>
    </a>
  )
}
