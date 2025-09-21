import React from 'react'
import Container from '../Container'
import ElementRevealFromBottom from '../Animations/ElementRevealFromBottom'
import { ReluxIcon } from '../ReluxIcon'
import Image from 'next/image'

export default function About() {
  return (
    <section className="py-[calc(var(--header-height)+theme(spacing.4))] pb-20 h-svh">
      <Container>
        <h1 className="text-sm highlight text-center mb-16 line-split-animation">
          Conheça a Relux
        </h1>
        <div className="grid grid-cols-3 gap-x-12">
          <div className="col-span-2 tracking-tight">
            <blockquote className="italic font-medium mb-24 text-2xl text-balance max-w-2xl line-split-animation">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </blockquote>

            <h2 data-delay={0.1} className="text-xs mb-1 text-accent line-split-animation">
              O que fazemos?
            </h2>
            <p
              data-delay={0.1}
              className="text-sm text-justify mb-6 line-split-animation max-w-md "
            >
              Entregamos soluções completas no setor imobiliário, desde a procura inicial até à
              entrega das chaves. Auxiliamos e orientamos as pessoas em todas as decisões
              relacionadas com o setor imobiliário.
            </p>
            <h2 data-delay={0.2} className="text-xs mb-1 text-accent line-split-animation">
              Como?
            </h2>
            <p data-delay={0.2} className="text-sm text-justify line-split-animation max-w-md ">
              Através da nossa equipa conectada e do nosso processo descomplicado, oferecemos
              soluções imobiliárias excepcionais. Usamos inovação, empatia e conhecimento local,
              apoiando os nossos clientes com consultoria e marketing digital, além de construir uma
              valiosa rede de networking.
            </p>
          </div>

          <div className="col-span-1 col-start-3">
            <ElementRevealFromBottom delay={0.4}>
              <div className="flex items-center justify-center" style={{ perspective: '800px' }}>
                <Image
                  src={'/images/about/sobre-relux.png'}
                  alt="Sobre a Relux"
                  width={0}
                  height={0}
                  sizes="33vw"
                  style={{ transform: 'rotateY(10deg) rotateX(15deg)' }}
                  className="aspect-square min-w-48 object-cover"
                />
              </div>
            </ElementRevealFromBottom>

            <div className="mt-[20vh] ps-4 border-l border-accent/10 h-fit">
              <h2 data-delay={0.3} className="text-xs mb-1 text-accent line-split-animation">
                Porquê?
              </h2>
              <p
                data-delay={0.3}
                className="text-sm tracking-tight text-pretty line-split-animation "
              >
                Existimos para mudar a opinião da população em relação ao setor imobiliário.
                Procuramos criar experiências únicas e honestas para os nossos clientes. Valorizamos
                os profissionais do setor imobiliário e desejamos ajudar as pessoas a tomar decisões
                importantes nas suas vidas, permitindo-lhes sonhar com a liberdade financeira que
                pode ser alcançada através de investimentos no setor imobiliário.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
