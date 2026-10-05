import type { ReactNode } from 'react'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

/** Clearly marks template/demo functionality (checkout, auth, forms). */
export function DemoNotice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex gap-3 border border-brass/50 bg-brass/[0.07] px-4 py-3.5 text-[0.82rem] leading-relaxed text-charcoal', className)} role="note">
      <Icon name="info" size={18} className="mt-0.5 shrink-0 text-brass-deep" />
      <div>{children}</div>
    </div>
  )
}
