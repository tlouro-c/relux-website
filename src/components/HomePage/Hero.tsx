import React from 'react'
import Container from '../Container'
import HeroForm from './HeroForm'
import HeroVideo from './HeroVideo'

export default function Hero() {
  const initialDelay = 1.5

  return (
    <>
      <section className="relative mb-[-100svh] bg-secondary text-background">
        <Container className="!max-w-none sticky top-0 h-[100svh] overflow-hidden">
          <HeroVideo />
          <div className="flex-1 relative text-background flex flex-col items-center z-[1] h-full pt-[var(--header-height)] pb-4">
            <div className="flex-1 flex flex-col py-40">
              <h1
                data-delay={initialDelay}
                className="text-4xl md:text-6xl lg:text-7xl max-w-3xl mb-12 font-medium tracking-tight line-split-animation text-balance text-center"
              >
                <span className="highlight">Unimos</span> Pessoas,{' '}
                <span className="highlight">Concretizamos</span> Sonhos.
              </h1>
              <HeroForm />
            </div>
          </div>
        </Container>
        <div className="h-[100svh] w-full pointer-events-none" />
      </section>
    </>
  )
}
