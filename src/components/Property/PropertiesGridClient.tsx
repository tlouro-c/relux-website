'use client'

import React from 'react'
import { useSidebar } from './SidebarContext'

export default function PropertiesGridClient({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${isOpen ? 'md:grid-cols-1' : 'md:grid-cols-2'} ${isOpen ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}
    >
      {children}
    </div>
  )
}
