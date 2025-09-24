import { animate, inView } from 'motion'
import { useEffect } from 'react'
import SplitType from 'split-type'

export default function LineSplitWithRetrigger({ retriggerKey }: { retriggerKey: number }) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.line-split-animation-with-retrigger'),
    )

    els.forEach((el) => {
      // Split into lines first
      const split = new SplitType(el, {
        types: 'lines',
        lineClass: 'line-child',
        tagName: 'span',
      })
      const lines = split.lines ?? []

      const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0

      // Wrap each line in a parent span
      lines.forEach((line) => {
        const wrapper = document.createElement('span')
        wrapper.className = 'line-parent'

        line.parentNode?.replaceChild(wrapper, line)
        wrapper.appendChild(line)

        // Initial styles for animation
        el.style.opacity = '1'
        line.style.transform = 'translateY(120%)'
        line.style.willChange = 'transform'
        line.style.display = 'inline-block' // ensures line behaves like block for animation
        wrapper.style.display = 'block' // parent span acts like line container
        wrapper.style.overflow = 'hidden' // hide overflowing during animation
      })

      // Animate when in view
      inView(el, () => {
        const staggerSec = 0.0625

        lines.forEach((line, i) => {
          animate(
            line,
            {
              transform: ['translateY(120%)', 'translateY(0%)'],
            },
            {
              duration: 1,
              delay: i * staggerSec + delay,
              ease: [0.645, 0.045, 0.355, 1],
            },
          )
        })
      })
    })
  }, [retriggerKey])

  return null
}
