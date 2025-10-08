'use client'

import React from 'react'
import { useSidebar } from './SidebarContext'
import { Button } from '../Button'
import { ListIcon } from 'lucide-react'

export default function ToggleSidebarButton() {
  const { toggle, isOpen } = useSidebar()

  return (
    <Button variant={'link'} size={'link'} animate={false} onClick={toggle}>
      {isOpen ? 'Fechar filtros' : 'Abrir filtros'} <ListIcon />
    </Button>
  )
}
