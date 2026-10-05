import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Large split-screen editorial block: a campaign visual on one side,
 * copy on the other. Use `reverse` to flip sides, `tone="dark"` for an ink background.
 */
export function EditorialSplit({
  image,
  imageAlt,
  caption,
  reverse = false,
  tone = 'cream',
  children,
  className,
}: {
  image: string
  imageAlt: string
  caption?: string
  reverse?: boolean
  tone?: 'cream' | 'ivory' | 'dark'
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'grid lg:min-h-[min(100svh,64rem)] lg:grid-cols-2',
        tone === 'cream' && 'bg-cream',
        tone === 'ivory' && 'bg-ivory',
        tone === 'dark' && 'on-dark bg-ink text-ivory',
        className,
      )}
    >
      <figure className={cn('relative min-w-0 overflow-hidden bg-sand', reverse && 'lg:order-2')}>
        <img src={image} alt={imageAlt} loading="lazy" className="aspect-[4/5] h-full w-full object-cover sm:aspect-[5/4] lg:absolute lg:inset-0 lg:aspect-auto" />
        {caption && (
          <figcaption className="absolute bottom-4 left-4 right-4 text-[0.7rem] uppercase tracking-[0.18em] text-ivory mix-blend-difference sm:bottom-6 sm:left-6">
            {caption}
          </figcaption>
        )}
      </figure>
      <div className="flex min-w-0 items-center px-[var(--spacing-gutter)] py-16 sm:py-24 lg:px-[clamp(3rem,7vw,8rem)]">
        <Reveal className="w-full max-w-xl">{children}</Reveal>
      </div>
    </section>
  )
}
