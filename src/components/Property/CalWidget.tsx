'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

export default function CalWidget() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: '30min' })
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: 'light',
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#0453f1',
          },
          dark: {
            'cal-brand': '#0453f1',
          },
        },
      })
    })()
  }, [])
  return null
}
