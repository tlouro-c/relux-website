'use client'

import React from 'react'
import { Button } from '../Button'
import ElementRevealFromBottom from '../Animations/ElementRevealFromBottom'
import { SearchIcon } from 'lucide-react'
import { ElementFadeIn } from '../Animations/ElementFadeIn'

export default function HeroForm() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  const formRef = React.useRef<HTMLFormElement>(null)
  const initialDelay = 1.5

  const handleClick = (endpoint: string) => {
    if (formRef.current) {
      const completeEndpoint = `${endpoint}/${(formRef.current[0] as HTMLInputElement).value}`
      formRef.current.action = completeEndpoint
    }
  }

  return (
    <>
      {mounted && (
        <ElementFadeIn delay={initialDelay} className="flex justify-center">
          <form
            ref={formRef}
            method="GET"
            className=" flex gap-4 items-center w-full max-w-2xl mx-auto md:mx-0 bg-gradient-to-r backdrop-blur-sm from-secondary via-secondary/90 to-secondary/50 rounded-full py-2 ps-6 pe-4 text-foreground"
          >
            <div className="flex-1 flex flex-col gap-2 opacity-50 focus-within:opacity-100 transition duration-300">
              <label
                data-delay={initialDelay}
                className="tracking-tight line-split-animation text-sm md:text-base sr-only"
              >
                Pesquisar
              </label>
              <ElementRevealFromBottom delay={initialDelay}>
                <input
                  className="bg-transparent placeholder:text-foreground tracking-tight font-medium rounded-none w-[26ch] outline-none text-sm md:text-base"
                  type="text"
                  placeholder="Distrito, Concelho, Código Postal..."
                />
              </ElementRevealFromBottom>
            </div>
            <Button
              className="rounded-full justify-center items-center"
              variant={'secondary'}
              size={'sm'}
              onClick={() => handleClick('/imoveis')}
            >
              <span className="hidden md:inline-block">Pesquisar</span>
              <SearchIcon className="my-2" />
            </Button>
          </form>
        </ElementFadeIn>
      )}
    </>
  )
}
