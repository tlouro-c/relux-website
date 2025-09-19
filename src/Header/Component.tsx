import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
import HeaderSlideFunctionality from './HeaderSlideFunctionality'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return (
    <>
      <HeaderSlideFunctionality />
      <header
        className="fixed top-0 left-0 w-full z-50 h-[var(--header-height)] site-header transition-transform [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1)]"
        style={{
          transitionDuration: '1200ms',
        }}
      >
        <HeaderNav data={headerData} />
      </header>
    </>
  )
}
