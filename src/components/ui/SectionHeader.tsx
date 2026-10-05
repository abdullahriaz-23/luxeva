import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Consistent editorial heading: index number + eyebrow + title + optional aside. */
export function SectionHeader({
  index,
  eyebrow,
  title,
  aside,
  className,
  tone = 'light',
  id,
}: {
  index?: string
  eyebrow?: string
  title: ReactNode
  aside?: ReactNode
  className?: string
  tone?: 'light' | 'dark'
  id?: string
}) {
  return (
    <div className={cn('flex flex-col gap-8 md:flex-row md:items-end md:justify-between', className)}>
      <div>
        {(index || eyebrow) && (
          <p className={cn('eyebrow mb-5 flex items-center gap-4', tone === 'dark' ? 'text-ivory/70' : 'text-taupe')}>
            {index && <span className="font-display text-sm normal-case tracking-normal italic">N°{index}</span>}
            {index && eyebrow && <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />}
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="display-lg max-w-[18ch]">{title}</h2>
      </div>
      {aside && <div className="md:pb-2">{aside}</div>}
    </div>
  )
}
