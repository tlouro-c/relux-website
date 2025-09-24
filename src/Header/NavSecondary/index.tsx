import ElementRevealFromBottom from '@/components/Animations/ElementRevealFromBottom'
import { Button } from '@/components/Button'
import { CircleIcon } from 'lucide-react'
import React from 'react'
import MegaMenuButton from '../MegaMenu/MegaMenuButton'

export default function NavSecondary() {
  return (
    <nav className="h-full flex items-center justify-end gap-2 px-4 md:px-6">
      <ElementRevealFromBottom once={false}>
        <MegaMenuButton />
      </ElementRevealFromBottom>
      <ElementRevealFromBottom once={false}>
        <Button href="/contacto" size={'sm'} className="relative z-50" variant={'secondary'}>
          Contactar <CircleIcon className="size-2 stroke-none fill-current" />
        </Button>
      </ElementRevealFromBottom>
    </nav>
  )
}
