'use client'

import { useMegaMenu } from '@/contexts/MegaMenuContext'
import React, { useEffect } from 'react'

export default function HeaderSlideFunctionality() {
  const [_previousScrollY, setPreviousScrollY] = React.useState(0)
  const { isOpen } = useMegaMenu()

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.site-header')
      const headerSecondary = document.querySelector('.site-header-secondary')
      if (!header || !headerSecondary) return

      const currentScrollY = window.scrollY

      setPreviousScrollY(() => {
        if (currentScrollY > 400) {
          headerSecondary.classList.remove('translate-y-[-100%]')
          headerSecondary.classList.remove('pointer-events-none')
        } else {
          if (!isOpen) {
            headerSecondary.classList.add('translate-y-[-100%]')
            headerSecondary.classList.add('pointer-events-none')
          }
        }

        return currentScrollY
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
