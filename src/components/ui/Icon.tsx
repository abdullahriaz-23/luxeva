import type { SVGProps } from 'react'

const paths = {
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.2-4.2 4.3-6 8-6s6.8 1.8 8 6" /></>,
  heart: <path d="M12 20.3s-7.8-4.7-8.9-10.1C2.4 6.7 4.6 4 7.6 4c1.9 0 3.4 1 4.4 2.6C13 5 14.5 4 16.4 4c3 0 5.2 2.7 4.5 6.2-1.1 5.4-8.9 10.1-8.9 10.1Z" />,
  bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  close: <path d="M5 5l14 14M19 5 5 19" />,
  menu: <path d="M3 8h18M3 16h18" />,
  arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M20 12H4m6-6-6 6 6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  eye: <><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="2.8" /></>,
  ruler: <><path d="M3 15.5 15.5 3 21 8.5 8.5 21 3 15.5Z" /><path d="m7 11.5 2 2M10 8.5l2 2M13 5.5l2 2" /></>,
  truck: <><path d="M2 6h12v10H2zM14 9h4l4 4v3h-8" /><circle cx="6" cy="18" r="1.8" /><circle cx="18" cy="18" r="1.8" /></>,
  returns: <><path d="M4 9h11a5 5 0 0 1 0 10H8" /><path d="m8 5-4 4 4 4" /></>,
  mail: <><path d="M3 5.5h18v13H3z" /><path d="m3 6 9 7 9-7" /></>,
  phone: <path d="M6.6 3.5 9.5 3l1.6 4.2-2 1.4a11 11 0 0 0 6.3 6.3l1.4-2 4.2 1.6-.5 2.9a2 2 0 0 1-2 1.6C10.4 19 5 13.6 5 5.5a2 2 0 0 1 1.6-2Z" />,
  pin: <><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  sliders: <path d="M4 7h10M18 7h2M4 17h4M12 17h8M14 4.5v5M8 14.5v5" />,
  grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>,
  card: <><rect x="2.5" y="5" width="19" height="14" /><path d="M2.5 9.5h19M6 15h4" /></>,
  sparkle: <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>,
} as const

export type IconName = keyof typeof paths

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

/** Thin-stroke icon set drawn for LUXEVA. Decorative by default (aria-hidden). */
export function Icon({ name, size = 20, strokeWidth = 1.25, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
