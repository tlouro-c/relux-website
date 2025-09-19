'use client'

import React, { useEffect } from 'react'

export default function HeaderSlideFunctionality() {
  const [_previousScrollY, setPreviousScrollY] = React.useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.site-header')
      if (!header) return

      const currentScrollY = window.scrollY
      
      setPreviousScrollY((prevScrollY) => {
        if (currentScrollY <= 0) {
          // Always show header when at top
          header.classList.remove('translate-y-[-100%]')
        } else if (currentScrollY > prevScrollY) {
          header.classList.add('translate-y-[-100%]')
        } else {
          header.classList.remove('translate-y-[-100%]')
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
