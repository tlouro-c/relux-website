'use client'

import React, { useEffect } from 'react'
import Container from '../Container'
import { animate, inView, motion, useScroll } from 'motion/react'
import SplitType from 'split-type'
import ServiceOneIcon from './ServicesIcons/ServiceOneIcon'
import ElementRevealFromBottom from '../Animations/ElementRevealFromBottom'
import ServiceTwoIcon from './ServicesIcons/ServiceTwoIcon'
import LineSplitWithRetrigger from '../Animations/LineSplitWithRetrigger'

const services = [
  {
    title: 'Imediacão Imobiliária',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <ServiceOneIcon className="size-16 text-accent" />,
  },
  {
    title: 'Arquitetura e Engenharia',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <ServiceTwoIcon className="size-16 text-accent" />,
  },
]

export default function ServicesSection() {
  const target = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start start', 'end end'],
  })

  const [activeIndex, setActiveIndex] = React.useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const newIndex = Math.floor(progress * services.length)
      const clampedIndex = Math.max(0, Math.min(newIndex, services.length - 1))

      if (clampedIndex !== activeIndex) {
        setActiveIndex(clampedIndex)
      }
    })

    return () => unsubscribe()
  }, [activeIndex])

  return (
    <section>
      <LineSplitWithRetrigger retriggerKey={activeIndex} />
      <Container className="relative hidden md:flex">
        <div
          ref={target}
          style={{ height: `calc(${services.length * 120}svh)` }}
          className={`flex-1`}
        >
          <div className="sticky top-0 h-svh flex flex-col justify-center">
            <motion.div key={activeIndex} className="space-y-8">
              <ElementRevealFromBottom once={false}>
                {services[activeIndex].icon}
              </ElementRevealFromBottom>
              <p
                data-delay={0.1}
                className="line-split-animation-with-retrigger text-xl leading-relaxed tracking-tight max-w-sm"
              >
                {services[activeIndex].description}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="flex-[2] ps-8 h-svh sticky top-0 flex flex-col justify-center">
          <h2 className="text-right section-badge text-accent line-split-animation">Serviços</h2>
          <ul className="flex flex-col mt-8 gap-2">
            {services.map((service, index) => (
              <li key={service.title}>
                <h3
                  style={{
                    transition: 'color 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
                  }}
                  data-delay={0.1}
                  className={`tracking-tight highlight text-5xl lg:text-6xl xl:text-7xl !leading-normal transition-colors line-split-animation ${activeIndex === index ? 'text-foreground' : 'text-secondary'}`}
                >
                  {service.title}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="relative md:hidden py-16">
        <h2 className="section-badge ms-auto text-right text-accent line-split-animation mb-16">Serviços</h2>
        <div className="space-y-12">
          {services.map((service, index) => (
            <div key={service.title} className="text-left space-y-4">
              <ElementRevealFromBottom>{service.icon}</ElementRevealFromBottom>
              <div className="space-y-4">
                <h3 className="section-title text-left line-split-animation">
                  {service.title}
                </h3>
                <p className="text-base tracking-tight max-w-md mx-auto line-split-animation">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
