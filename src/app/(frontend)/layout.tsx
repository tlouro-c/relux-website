import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { ppEiko, raleway } from '@/utilities/fonts'
import LineSplitInit from '@/components/Animations/LineSplitInit'
import ParallaxInit from '@/components/Animations/ParallaxInit'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(raleway.variable, ppEiko.variable)} lang="pt" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          page_path: window.location.pathname,
        });
      `}
            </Script>
          </>
        )}
      </head>
      <body>
        <Providers>
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
