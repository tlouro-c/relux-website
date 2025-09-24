import LenisProvider from '@/components/LenisProvider'
import { MegaMenuProvider } from '@/contexts/MegaMenuContext'
import React from 'react'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <LenisProvider>
      <MegaMenuProvider>{children}</MegaMenuProvider>
    </LenisProvider>
  )
}
