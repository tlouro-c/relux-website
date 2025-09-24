'use client'

import { Button } from '@/components/Button'
import { useMegaMenu } from '@/contexts/MegaMenuContext'
import { MenuIcon } from 'lucide-react'

export default function MegaMenuButton() {
  const { toggleMenu } = useMegaMenu()

  return (
    <Button size={'sm'} className="relative z-50" onClick={toggleMenu}>
      Menu <MenuIcon />
    </Button>
  )
}