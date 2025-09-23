import React from 'react'
import Container from '../Container'
import ElementRevealFromBottom from '../Animations/ElementRevealFromBottom'
import { ReluxIcon } from '../ReluxIcon'
import Image from 'next/image'
import { ElementFadeIn } from '../Animations/ElementFadeIn'

export default function About() {
  return (
    <section className="py-[calc(var(--header-height)+theme(spacing.4))] pb-20 min-h-svh">
      <Container>
        <h1 className="text-sm highlight text-center mb-8 md:mb-16 line-split-animation">
          Conheça a Relux
        </h1>
        <div className="grid grid-cols-3 gap-x-4 md:gap-x-12">
          <div className="col-span-3 md:col-span-2 tracking-tight">
            <blockquote className="italic font-medium mb-12 md:mb-24 text-xl md:text-2xl max-w-2xl line-split-animation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </blockquote>
            <div className="hidden md:block">
              <h2 data-delay={0.1} className="text-sm mb-1 text-accent line-split-animation">
                O que fazemos?
              </h2>
              <p
                data-delay={0.1}
                className="text-base md:text-sm text-justify mb-6 line-split-animation max-w-md "
              >
                Entregamos soluções completas no setor imobiliário, desde a procura inicial até à
                entrega das chaves. Auxiliamos e orientamos as pessoas em todas as decisões
                relacionadas com o setor imobiliário.
              </p>
              <h2 data-delay={0.2} className="text-sm mb-1 text-accent line-split-animation">
                Como?
              </h2>
              <p
                data-delay={0.2}
                className="text-base md:text-sm text-justify line-split-animation max-w-md "
              >
                Através da nossa equipa conectada e do nosso processo descomplicado, oferecemos
                soluções imobiliárias excepcionais. Usamos inovação, empatia e conhecimento local,
                apoiando os nossos clientes com consultoria e marketing digital, além de construir
                uma valiosa rede de networking.
              </p>
            </div>
          </div>

          <div className="col-span-3 md:col-span-1 md:col-start-3 mb-12">
            <ElementFadeIn delay={0.4}>
              <div className="flex items-center justify-center" style={{ perspective: '800px' }}>
                <Image
                  src={'/images/about/sobre-relux.png'}
                  alt="Sobre a Relux"
                  width={0}
                  height={0}
                  sizes="33vw"
                  style={{ transform: 'rotateY(10deg) rotateX(15deg)' }}
                  className="aspect-square w-3/4 md:w-64 object-cover"
                />
              </div>
            </ElementFadeIn>
            <div className="hidden md:block mt-16 ps-4 border-l border-accent/10 h-fit">
              <h2 data-delay={0.3} className="text-sm mb-1 text-accent line-split-animation">
                Porquê?
              </h2>
              <p
                data-delay={0.3}
                className="text-base md:text-sm tracking-tight text-pretty line-split-animation "
              >
                Existimos para mudar a opinião da população em relação ao setor imobiliário.
                Procuramos criar experiências únicas e honestas para os nossos clientes. Valorizamos
                os profissionais do setor imobiliário e desejamos ajudar as pessoas a tomar decisões
                importantes nas suas vidas, permitindo-lhes sonhar com a liberdade financeira que
                pode ser alcançada através de investimentos no setor imobiliário.
              </p>
            </div>
          </div>
          <div className="md:hidden col-span-3">
            <h2
              data-delay={0.1}
              className="text-sm mb-1 text-accent line-split-animation text-right"
            >
              O que fazemos?
            </h2>
            <p
              data-delay={0.1}
              className="text-base md:text-sm text-justify mb-6 line-split-animation"
            >
              Entregamos soluções completas no setor imobiliário, desde a procura inicial até à
              entrega das chaves. Auxiliamos e orientamos as pessoas em todas as decisões
              relacionadas com o setor imobiliário.
            </p>
            <h2
              data-delay={0.2}
              className="text-sm mb-1 text-accent line-split-animation text-right"
            >
              Como?
            </h2>
            <p data-delay={0.2} className="text-base md:text-sm line-split-animation mb-6">
              Através da nossa equipa conectada e do nosso processo descomplicado, oferecemos
              soluções imobiliárias excepcionais. Usamos inovação, empatia e conhecimento local,
              apoiando os nossos clientes com consultoria e marketing digital, além de construir uma
              valiosa rede de networking.
            </p>
            <h2
              data-delay={0.3}
              className="text-sm mb-1 text-accent line-split-animation text-right"
            >
              Porquê?
            </h2>
            <p
              data-delay={0.3}
              className="text-base md:text-sm tracking-tight text-pretty line-split-animation"
            >
              Existimos para mudar a opinião da população em relação ao setor imobiliário.
              Procuramos criar experiências únicas e honestas para os nossos clientes. Valorizamos
              os profissionais do setor imobiliário e desejamos ajudar as pessoas a tomar decisões
              importantes nas suas vidas, permitindo-lhes sonhar com a liberdade financeira que pode
              ser alcançada através de investimentos no setor imobiliário.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
