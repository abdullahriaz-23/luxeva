import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { cn } from '@/lib/cn'

/** Editorial header for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  aside,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  crumbs?: Crumb[]
  aside?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('container-site pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pt-20', className)}>
      {crumbs && <Breadcrumbs items={crumbs} className="mb-10 lg:mb-14" />}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          {eyebrow && <p className="eyebrow text-taupe">{eyebrow}</p>}
          <h1 className="display-xl mt-5">{title}</h1>
          {intro && <div className="lede mt-6 max-w-2xl text-taupe">{intro}</div>}
        </div>
        {aside && <div className="lg:pb-3">{aside}</div>}
      </div>
    </header>
  )
}
