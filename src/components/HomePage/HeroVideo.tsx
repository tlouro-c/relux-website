'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ReluxIcon } from '../ReluxIcon'
import Image from 'next/image'

export default function HeroVideo() {
  const target = React.useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({
    target,
  })

  const opacity = useTransform(scrollY, [0, 400], [0.5, 0.8])

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // Try to play video
    const playPromise = v.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If autoplay is blocked, show fallback image
        setFallback(true)
      })
    }
  }, [])

  return (
    <div ref={target} style={{ position: 'absolute', left: 0 }} className="h-full w-full">
      <motion.div
        initial={{ translateY: 0 }}
        animate={{ translateY: '-100%' }}
        transition={{
          duration: 0.5,
          ease: [0.645, 0.045, 0.355, 1],
          delay: 1,
        }}
        className="bg-secondary w-full h-full absolute top-0 left-0 flex justify-center items-center rounded-b-xl z-50"
      >
        <div className="flex items-center justify-center relative w-36 h-36">
          <motion.div
            initial={{ height: '100%' }}
            animate={{ height: 0 }}
            transition={{
              duration: 1,
              ease: [0.645, 0.045, 0.355, 1],
            }}
            className="absolute inset-0 z-10 bg-secondary"
          />
          <ReluxIcon className="text-foreground w-32 h-32" />
        </div>
      </motion.div>
      <motion.div
        className="w-full h-full flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: {
            delay: 1,
            duration: 1,
            ease: [0.645, 0.045, 0.355, 1],
          },
        }}
      >
        <div className="relative w-full h-full">
          {fallback ? (
            <Image
              className="absolute inset-0 w-full h-full object-cover object-center contrast-[1.1] brightness-90 -z-10"
              src="/images/hero-imovel-agencia-imobiliaria.png"
              alt="Imóvel - Agência Imobiliária"
              height={0}
              width={0}
              sizes="100vw"
            />
          ) : (
            <video
              ref={videoRef}
              poster="/images/hero-imovel-agencia-imobiliaria.png"
              playsInline
              autoPlay
              loop
              muted
              className="w-full h-full object-cover object-center contrast-[1.1] pointer-events-none brightness-90 -z-20"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity.get() }}
        transition={{ delay: 1.5 }}
        className="bg-black absolute inset-0"
        style={{ opacity }}
      />
    </div>
  )
}
