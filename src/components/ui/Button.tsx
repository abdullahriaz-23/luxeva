import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/lib/cn'
import { buttonClass, type Variant, type Size } from './buttonStyles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  arrow?: boolean
  children: ReactNode
}

const Arrow = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" className="transition-transform duration-300 ease-luxe group-hover/btn:translate-x-1">
    <path d="M0 5h16.5M12.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
  </svg>
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', arrow, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={buttonClass(variant, size, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
})

interface ButtonLinkProps extends LinkProps {
  variant?: Variant
  size?: Size
  arrow?: boolean
}

export function ButtonLink({ variant = 'primary', size = 'md', arrow, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, size, typeof className === 'string' ? className : undefined)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  )
}

/** Editorial text link with an arrow: “Discover the collection →” */
export function ArrowLink({ className, children, ...rest }: LinkProps) {
  return (
    <Link
      className={cn(
        'group/al inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em]',
        typeof className === 'string' ? className : undefined,
      )}
      {...rest}
    >
      <span className="link-underline-static">{children}</span>
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" className="transition-transform duration-300 ease-luxe group-hover/al:translate-x-1">
        <path d="M0 5h16.5M12.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    </Link>
  )
}
