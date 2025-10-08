'use client'

import React, { useState, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/Button'

interface MobileFiltersToggleProps {
  children: React.ReactNode
}

export default function MobileFiltersToggle({ children }: MobileFiltersToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const gridElement = document.querySelector('[data-properties-grid]')
      if (gridElement) {
        const rect = gridElement.getBoundingClientRect()
        const isGridVisible = rect.top < window.innerHeight && rect.bottom > 0
        setIsVisible(isGridVisible)
      }
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Toggle Button - Fixed at bottom, only visible when grid is visible */}
      <div
        className={`md:hidden fixed bottom-4 left-4 right-4 transition-transform duration-300 px-6 ${isOpen ? 'z-[61]' : 'z-[30]'} ${
          isVisible ? 'translate-y-0' : 'translate-y-20'
        }`}
      >
        <Button
          onClick={toggle}
          variant="default"
          size="sm"
          className="w-full bg-foreground/80 backdrop-blur-sm"
          animate={false}
        >
          <SlidersHorizontal />
          {isOpen ? 'Fechar Filtros' : 'Filtros'}
        </Button>
      </div>

      {/* Mobile Filter Menu - Bottom Sheet */}
      <div
        className={`md:hidden fixed left-0 right-0 bottom-0 bg-background z-[60] shadow-2xl transition-transform duration-500 ease-in-out transform rounded-t-2xl overflow-hidden ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Filters Content */}
        <div className="p-4 pb-20 md:hidden">{children}</div>
      </div>
    </>
  )
}
