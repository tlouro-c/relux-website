import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { ppEiko, raleway } from '@/utilities/fonts'
import LineSplitInit from '@/components/Animations/LineSplitInit'
import ParallaxInit from '@/components/Animations/ParallaxInit'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(raleway.variable, ppEiko.variable)} lang="en" suppressHydrationWarning>
      <head></head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
          <Header />
          <main>{children}</main>
          <Footer />
          <LineSplitInit />
          <ParallaxInit />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
