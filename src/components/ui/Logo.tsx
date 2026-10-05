import { cn } from '@/lib/cn'
import { site } from '@/config/site'

/**
 * Typographic wordmark. Change the brand name in src/config/site.ts.
 * To use an image logo instead, replace the <span> with an <img>.
 */
export function Logo({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      className={cn(
        'font-display font-medium uppercase leading-none tracking-[var(--tracking-wordmark)] [margin-right:calc(var(--tracking-wordmark)*-1)]',
        size === 'sm' && 'text-base',
        size === 'md' && 'text-[1.35rem] sm:text-[1.55rem]',
        size === 'lg' && 'text-3xl',
        className,
      )}
    >
      {site.name}
    </span>
  )
}
