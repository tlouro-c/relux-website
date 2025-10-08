'use client'

import React, { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

export default function InlineCal() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: '30min' })
      cal('ui', {
        hideEventTypeDetails: true,
        layout: 'month_view',
        theme: 'light',
        colorScheme: '#0453f1',
      })
    })()
  }, [])
  return (
    <Cal
      namespace="30min"
      calLink="tomas-correia/30min"
      style={{ width: '100%', flex: 1, overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  )
}
