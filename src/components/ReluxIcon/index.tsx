import * as React from 'react'

type ReluxIconProps = React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>

export const ReluxIcon = (props: ReluxIconProps) => {
  return (
    <svg
      width={257.111}
      height={266.667}
      viewBox="0 0 257.111 266.667"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="a">
          <path d="M-396.791 400.412h578.639v-601h-578.639Z" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="b">
          <path d="M-280.399 391.848H298.24v-601h-578.639Z" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="c">
          <path d="M-328.944 240.48h578.639v-601h-578.639Z" />
        </clipPath>
      </defs>
      <g
        style={{
          fill: 'currentColor',
          fillOpacity: 1,
        }}
      >
        <path
          d="M0 0h-44.467l-79.953 79.962h-63.37v39.98h79.962v-.024l.016.016L3.55 8.564C6.709 5.405 4.47 0 0 0"
          style={{
            fillOpacity: 1,
            fillRule: 'nonzero',
            stroke: 'none',
          }}
          transform="matrix(1.33333 0 0 -1.33333 250.408 266.55)"
          clipPath="url(#a)"
        />
        <path
          d="M0 0c3.159-3.159.92-8.564-3.55-8.564h-27.835v-.088h-39.981v39.981h39.949v.088l19.991-19.99z"
          style={{
            fillOpacity: 1,
            fillRule: 'nonzero',
            stroke: 'none',
          }}
          transform="matrix(1.33333 0 0 -1.33333 95.219 255.131)"
          clipPath="url(#b)"
        />
        <path
          d="M0 0h-119.958v39.981l149.92-.008c5.533 0 10.019-4.486 10.019-10.019v-77.835c0-4.47-5.398-6.701-8.556-3.542L0-19.998Z"
          style={{
            fillOpacity: 1,
            fillRule: 'nonzero',
            stroke: 'none',
          }}
          transform="matrix(1.33333 0 0 -1.33333 159.945 53.308)"
          clipPath="url(#c)"
        />
      </g>
    </svg>
  )
}
