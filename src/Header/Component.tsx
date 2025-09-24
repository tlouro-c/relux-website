import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
import HeaderSlideFunctionality from './HeaderSlideFunctionality'
import NavSecondary from './NavSecondary'
import MegaMenu from './MegaMenu'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return (
    <>
      <HeaderSlideFunctionality />
      <MegaMenu data={headerData} />
      <header
        className="absolute top-0 left-0 w-full z-[50] h-[var(--header-height)] site-header transition-transform [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1)]"
        style={{
          transitionDuration: '500ms',
        }}
      >
        <HeaderNav data={headerData} />
      </header>
      <header
        className="site-header-secondary translate-y-[-100%] w-full z-50 fixed top-0 left-0 h-[var(--header-height)] transition-transform [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1)]"
        style={{
          transitionDuration: '500ms',
        }}
      >
        <NavSecondary />
      </header>
    </>
  )
}
