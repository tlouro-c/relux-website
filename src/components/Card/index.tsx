'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'createdAt'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, meta, title, createdAt } = doc || {}
  const { image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  return (
    <Link href={href} {...link}>
      <article
        className={cn('overflow-hidden hover:cursor-pointer flex items-start', className)}
        ref={card.ref}
      >
        <div className="relative flex-1 flex items-center justify-center aspect-[16/10] rounded-lg overflow-hidden">
          {!metaImage && <div className="">No image</div>}
          {metaImage && typeof metaImage !== 'string' && (
            <Media
              className="w-full h-full"
              pictureClassName="h-full w-full"
              imgClassName="object-cover w-full h-full"
              resource={metaImage}
              size="33vw"
            />
          )}
        </div>
        <div className="ps-4 flex flex-col flex-[2] overflow-hidden">
          <div className="text-muted-foreground text-xs mb-1">
            {new Date(createdAt!).toLocaleDateString('pt-PT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          {titleToUse && (
            <div className="font-semibold tracking-tighter leading-tight line-clamp-2">
              <h3>{titleToUse}</h3>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
