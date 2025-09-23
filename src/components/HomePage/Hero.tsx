import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import HeroForm from './HeroForm'
import HeroImageWrapper from './HeroImageWrapper'

export default function Hero() {
  const initialDelay = 0.6

  return (
    <>
      <section className="relative mb-[-100svh] bg-foreground text-background">
        <Container className="!max-w-none sticky top-0 h-[100svh] overflow-hidden">
          <HeroImageWrapper>
            <Image
              className="w-full h-full object-cover object-center pointer-events-none"
              src="/images/hero-imovel-agencia-imobiliaria.png"
              alt="Imóvel - Agência Imobiliária"
              width={0}
              height={0}
              sizes="100vh"
              priority
              decoding="sync"
            />
          </HeroImageWrapper>
          <div className="flex-1 relative text-background flex flex-col z-[1] h-full pt-[var(--header-height)] pb-4">
            <div className="flex-1 flex flex-col md:justify-center py-20">
              <h1
                data-delay={initialDelay}
                className="text-4xl md:text-6xl max-w-3xl mb-8 font-medium tracking-tight line-split-animation text-balance"
              >
                <span className="highlight">Unimos</span> Pessoas,{' '}
                <span className="highlight">Concretizamos</span> Sonhos.
              </h1>
              <HeroForm />
            </div>
            <div className="justify-end items-end hidden md:flex">
              <p
                data-delay={initialDelay + 0.4}
                className="max-w-lg w-full text-2xl line-split-animation leading-relaxed font-medium text-balance"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </Container>
        <div className="h-[100svh] w-full pointer-events-none" />
      </section>
    </>
  )
}
