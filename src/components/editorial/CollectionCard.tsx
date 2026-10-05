import { Link } from 'react-router'
import type { Collection } from '@/types'
import { cn } from '@/lib/cn'

/** Tall editorial card used for collection listings. */
export function CollectionCard({ collection, className, priority }: { collection: Collection; className?: string; priority?: boolean }) {
  return (
    <article className={cn('group relative', className)}>
      <div className="relative overflow-hidden bg-sand">
        <img
          src={collection.heroImage}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          className="aspect-[4/5] w-full object-cover transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-[1.035]"
        />
        <span className="absolute left-4 top-4 font-display text-lg italic text-ivory mix-blend-difference">N°{collection.index}</span>
      </div>
      <p className="eyebrow mt-5 text-taupe">{collection.season}</p>
      <h3 className="mt-2 font-display text-3xl leading-tight">
        <Link to={`/collections/${collection.slug}`} className="link-underline after:absolute after:inset-0 after:content-['']">
          {collection.name}
        </Link>
      </h3>
      <p className="mt-2 text-[0.95rem] text-taupe">{collection.tagline}</p>
    </article>
  )
}
