'use client'

import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useState } from 'react'

interface MegaMenuContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleMenu: () => void
}

const MegaMenuContext = createContext<MegaMenuContextType | undefined>(undefined)

export function MegaMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <MegaMenuContext.Provider value={{ isOpen, setIsOpen, toggleMenu }}>
      {children}
    </MegaMenuContext.Provider>
  )
}

export function useMegaMenu() {
  const context = useContext(MegaMenuContext)
  if (context === undefined) {
    throw new Error('useMegaMenu must be used within a MegaMenuProvider')
  }
  return context
}
