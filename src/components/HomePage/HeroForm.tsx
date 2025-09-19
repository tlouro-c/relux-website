import React from 'react'
import { Button } from '../Button'
import ElementRevealFromBottom from '../Animations/ElementRevealFromBottom'

export default function HeroForm() {
  const initialDelay = 0.6

  return (
    <form className="flex flex-col gap-4 md:flex-row items-center md:items-end w-full max-w-4xl mx-auto md:mx-0">
      <div className="flex flex-col gap-2 opacity-75 focus-within:opacity-100 transition duration-300">
        <label data-delay={initialDelay} className="highlight line-split-animation text-sm md:text-base">
          Pesquisar
        </label>
        <ElementRevealFromBottom delay={initialDelay}>
        <input
          className="bg-transparent placeholder:text-background border-b-background border-b-[1.5px] w-[28ch] md:w-[32ch] outline-none text-lg md:text-xl"
          type="text"
          placeholder="Distrito, Concelho, Código Postal..."
        />
        </ElementRevealFromBottom>
      </div>
      <div className="space-x-2 flex items-end">
        <ElementRevealFromBottom delay={initialDelay + 0.1}>
          <Button size={'sm'}>
            Comprar
          </Button>
        </ElementRevealFromBottom>
        <ElementRevealFromBottom delay={initialDelay + 0.2}>
          <Button size={'sm'} variant={'secondary'}>
            Arrendar
          </Button>
        </ElementRevealFromBottom>
      </div>
    </form>
  )
}
