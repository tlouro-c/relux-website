import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import Container from '@/components/Container'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { heroImage, title } = post

  return (
    <div className="relative pt-[calc(var(--header-height))] flex items-center h-[60svh]">
      <Container className="relative z-10">
        <h1 className="mx-auto text-4xl md:text-6xl lg:text-7xl max-w-5xl !leading-tight mb-12 font-medium tracking-tight line-split-animation text-balance text-center text-background">
          {title}
        </h1>
      </Container>

      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-full bg-gradient-to-t from-black via-black/50 to-black/30" />
      </div>
    </div>
  )
}
