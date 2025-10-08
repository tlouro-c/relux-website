'use client'

import { Consultant } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import { PlayIcon } from 'lucide-react'

export default function Presentation({ consultant }: { consultant: Consultant }) {
  const [loadVideo, setLoadVideo] = React.useState<boolean>(false)

  return (
    <div className="shrink-0 w-80 aspect-[2/3] relative overflow-hidden rounded-lg">
      <Image
        src={consultant.imageUrl || '/images/consultants/default.png'}
        alt={consultant.name}
        height={0}
        width={0}
        sizes="40vw"
        className="h-full w-full object-cover"
      />
      {consultant.videoUrl && !loadVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayIcon className="size-16 fill-background stroke-none" />
        </div>
      )}

      {consultant.videoUrl && loadVideo && (
        <video controls className="absolute inset-0 w-full h-full object-cover">
          <source src={consultant.videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
