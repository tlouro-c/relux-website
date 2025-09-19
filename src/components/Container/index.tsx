import React from 'react'
import { Slot } from '@radix-ui/react-slot'

export default function Container({
  children,
  className,
  asChild = false,
  style,
}: {
  children?: React.ReactNode
  className?: string
  asChild?: boolean
  style?: React.CSSProperties
}) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp className={`max-w-7xl w-full mx-auto px-4 md:px-6 ${className}`} style={style}>
      {children}
    </Comp>
  )
}
