import LenisProvider from '@/components/LenisProvider'
import React from 'react'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <LenisProvider>{children}</LenisProvider>
}
