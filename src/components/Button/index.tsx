import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

const buttonVariants = cva(
  "group/button inline-flex items-center justify-center gap-2 tracking-tight whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-background',
        outline: 'border-[0.5px] border-foreground bg-transparent',
        secondary: 'bg-secondary text-foreground',
        ghost: '',
        link: '',
        accent: 'bg-accent text-background',
      },
      size: {
        sm: 'h-10 gap-1.5 px-6',
        lg: 'h-12 px-8',
        link: 'px-4 py-2 h-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  },
)

export type ButtonProps = {
  className?: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  children: React.ReactNode
  href?: string
} & (
  | (React.ComponentProps<'button'> & { href?: never })
  | (React.ComponentProps<'a'> & { href: string })
)

function Button({ className, variant, size, children, href, ...props }: ButtonProps) {
  const animatedContent = (
    <span className="overflow-hidden relative">
      <span
        className="inline-flex items-center gap-3 translate-y-0 group-hover/button:-translate-y-full origin-left rotate-0 group-hover/button:-rotate-[15deg]"
        style={{ transition: 'transform 600ms cubic-bezier(0.645, 0.045, 0.355, 1)' }}
      >
        {children}
      </span>
      <span
        className="absolute inline-flex items-center left-1/2 -translate-x-1/2 gap-3 translate-y-full group-hover/button:translate-y-0 origin-left rotate-[15deg] group-hover/button:rotate-0"
        style={{ transition: 'transform 600ms cubic-bezier(0.645, 0.045, 0.355, 1)' }}
      >
        {children}
      </span>
    </span>
  )

  if (href) {
    const { href: _, ...linkProps } = props as React.ComponentProps<'a'> & { href?: string }
    return (
      <Link href={href} className={cn(buttonVariants({ variant, size, className }))} {...linkProps}>
        {animatedContent}
      </Link>
    )
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...(props as React.ComponentProps<'button'>)}
    >
      {animatedContent}
    </button>
  )
}

export { Button, buttonVariants }
