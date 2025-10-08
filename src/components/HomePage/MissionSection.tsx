import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import { MapPinIcon } from 'lucide-react'
import { ElementFadeIn } from '../Animations/ElementFadeIn'

export default function MissionSection() {
  return (
    <section className="py-20 bg-foreground relative overflow-hidden rounded-xl">
      <Container className="text-background">
        <div className="max-w-4xl">
          <h2 className="section-badge text-left line-split-animation mb-2">Missão</h2>
          <p className="text-lg md:text-3xl text-left !leading-relaxed hyphens-auto break-words font-medium tracking-tighter line-split-animation">
            Na Relux, acreditamos que o imobiliário em Portugal merece mais. Unimos investimento
            imobiliário estratégico e consultoria de imóveis inovadora, criando uma história marcada
            por transparência, confiança e elegância em cada detalhe.
          </p>
        </div>
        <div className="mt-48 flex ">
          <div
            className="min-w-[200px] h-[300px] parallax-animation z-10 backdrop-blur-[2px] shadow-md"
            data-aggressiveness="0.5"
          >
            <Image
              src={'/images/mission/casa-piscina-agueda.png'}
              alt="Casa com piscina"
              width={200}
              height={300}
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div
            className="w-[300px] h-[200px] parallax-animation -ms-32 md:-ms-12 -mt-32 md:-mt-24 backdrop-blur-[2px] shadow-md"
            data-aggressiveness="1"
          >
            <Image
              src={'/images/mission/casas-modernas-agueda.png'}
              alt="Casa moderna"
              width={200}
              height={300}
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div
            className="w-[300px] h-[200px] parallax-animation z-10 -ms-24 mt-32 backdrop-blur-[2px] shadow-md"
            data-aggressiveness="1.5"
          >
            <Image
              src={'/images/mission/casa-moderna-piscina-agueda.png'}
              alt="Casa moderna com piscina"
              width={200}
              height={300}
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </Container>
      <ElementFadeIn
        delay={0.2}
        style={{ perspective: '1200px' }}
        className="hidden brightness-[0.8] md:block absolute top-0 right-0 z-0 pointer-events-none h-full w-[800px] translate-x-1/4 scale-[0.8]"
      >
        <Image
          src={'/images/location-map.svg'}
          alt="Mapa de localização"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          style={{
            transform: 'rotateX(25deg) translateZ(200px)',
            maskImage: `
    linear-gradient(to left, black 55%, transparent 100%),
    linear-gradient(to top, black 55%, transparent 100%),
    linear-gradient(to bottom, black 55%, transparent 100%)
  `,
            WebkitMaskImage: `
    linear-gradient(to left, black 55%, transparent 100%),
    linear-gradient(to top, black 55%, transparent 100%),
    linear-gradient(to bottom, black 55%, transparent 100%)
  `,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }}
        />
        <span className="absolute left-[30%] top-[30%] bg-accent text-background text-4xl highlight p-1 rounded-[1px]">
          Águeda
        </span>
        <span
          className="absolute left-[46%] top-[21%] text-background flex flex-col items-center animate-bounce"
          style={{ animationDuration: '1.5s' }}
        >
          <span className="text-background bg-accent px-1 rounded-[1px] font-medium">Relux</span>
          <MapPinIcon className="fill-foreground" />
        </span>
      </ElementFadeIn>
    </section>
  )
}
