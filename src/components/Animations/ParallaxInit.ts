'use client'

import { useEffect } from 'react'
import { animate, scroll } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function ParallaxInit() {
  const pathname = usePathname()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.parallax-animation'))

    els.forEach((el) => {
      el.style.opacity = '1'
      el.style.willChange = 'transform'

      const agressiveness = el.dataset.aggressiveness ? parseFloat(el.dataset.aggressiveness) : 1

      scroll(animate(el, { translateY: [0, -100 * agressiveness] }), {
        target: el,
        offset: ['start end', 'end start'],
      })
    })
  }, [pathname])

  return null
}
