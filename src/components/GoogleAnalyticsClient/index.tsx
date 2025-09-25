'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function GoogleAnalyticsClient() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    const url = pathname + searchParams.toString()
    window.gtag?.('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    })
  }, [pathname, searchParams])

  return null
}
