import { Link } from 'react-router'
import type { Article } from '@/types'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/cn'

export function ArticleCard({ article, size = 'md', className }: { article: Article; size?: 'lg' | 'md'; className?: string }) {
  const href = `/journal/${article.slug}`
  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="overflow-hidden bg-sand">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          decoding="async"
          className={cn(
            'w-full object-cover transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-[1.04]',
            size === 'lg' ? 'aspect-[4/3]' : 'aspect-[4/5]',
          )}
        />
      </div>
      <p className="eyebrow mt-5 flex items-center gap-3 text-taupe">
        <span className="text-ink">{article.category}</span>
        <span className="h-px w-5 bg-current opacity-40" aria-hidden="true" />
        <span>{article.readingTime} min read</span>
      </p>
      <h3 className={cn('mt-3 font-display leading-[1.08]', size === 'lg' ? 'text-3xl sm:text-[2.6rem]' : 'text-2xl')}>
        <Link to={href} className="link-underline after:absolute after:inset-0 after:content-['']">
          {article.title}
        </Link>
      </h3>
      {size === 'lg' && <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-taupe">{article.excerpt}</p>}
      <p className="mt-4 text-[0.78rem] text-taupe">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </p>
    </article>
  )
}
