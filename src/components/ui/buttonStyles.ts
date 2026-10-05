import { cn } from '@/lib/cn'

export type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light' | 'text'
export type Size = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex max-w-full items-center justify-center gap-3 text-center font-sans font-medium uppercase tracking-[0.18em] transition-[background-color,color,border-color,opacity] duration-300 ease-luxe disabled:opacity-40 disabled:pointer-events-none select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-ivory hover:bg-charcoal border border-ink',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-ivory',
  ghost: 'border border-line-strong text-ink hover:border-ink',
  light: 'bg-ivory text-ink hover:bg-cream border border-ivory',
  'outline-light': 'on-dark border border-ivory/60 text-ivory hover:bg-ivory hover:text-ink hover:border-ivory',
  text: 'text-ink !px-0 !min-h-0 link-underline-static',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-5 text-[0.65rem]',
  md: 'min-h-12 px-5 text-[0.7rem] sm:px-7',
  lg: 'min-h-14 px-6 text-[0.72rem] sm:px-9',
}

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', className?: string) =>
  cn(base, variants[variant], sizes[size], className)

