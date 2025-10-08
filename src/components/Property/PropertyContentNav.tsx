'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'
import { useLenis } from 'lenis/react'

export default function PropertyContentNav({
  hasVideo,
  hasVirtualTour,
}: {
  hasVideo: boolean
  hasVirtualTour: boolean
}) {
  const [activeSection, setActiveSection] = useState<string>('overview')
  const navRef = useRef<HTMLDivElement>(null)
  const [underlineStyle, setUnderlineStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  })
  const lenis = useLenis()

  const navItems = [
    { id: 'overview', label: 'Informações Gerais' },
    { id: 'spaces', label: 'Espaços' },
    ...(hasVideo ? [{ id: 'video', label: 'Vídeo' }] : []),
    ...(hasVirtualTour ? [{ id: 'virtual-tour', label: 'Tour Virtual' }] : []),
  ]

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    // Map to store current intersection ratios
    const ratioMap: Record<string, number> = {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap[entry.target.id] = entry.intersectionRatio
        })

        // Pick the section with the highest ratio
        const mostVisibleId = Object.entries(ratioMap).reduce((prev, [id, ratio]) => {
          return ratio > (ratioMap[prev] || 0) ? id : prev
        }, sections[0].id)

        setActiveSection(mostVisibleId)
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [hasVideo, hasVirtualTour])

  // Update underline position
  useEffect(() => {
    const currentLink = navRef.current?.querySelector<HTMLButtonElement>(
      `button[data-id="${activeSection}"]`,
    )
    if (currentLink) {
      const rect = currentLink.getBoundingClientRect()
      const parentRect = navRef.current!.getBoundingClientRect()
      setUnderlineStyle({ left: rect.left - parentRect.left, width: rect.width })
    }
  }, [activeSection])

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    lenis?.scrollTo(`#${id}`, { offset: -150 })
  }

  return (
    <nav
      ref={navRef}
      className="sticky top-0 h-[calc(var(--header-height))] w-full text-center bg-background overflow-hidden z-10"
    >
      <div className="relative grid md:grid-cols-4 h-full w-full">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            data-id={id}
            onClick={handleClick(id)}
            className={clsx(
              'tracking-tight whitespace-nowrap font-semibold flex items-center justify-center p-4 transition-colors',
              activeSection === id ? 'text-accent' : 'text-muted-foreground',
            )}
          >
            {label}
          </button>
        ))}

        {/* Smooth underline */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-accent"
          animate={{ left: underlineStyle.left, width: underlineStyle.width }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </nav>
  )
}
