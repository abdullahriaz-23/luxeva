import { Link, useParams } from 'react-router'
import { articles, getArticle } from '@/data/articles'
import { useSeo } from '@/hooks/useSeo'
import { formatDate } from '@/lib/format'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ArticleCard } from '@/components/editorial/ArticleCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ArrowLink } from '@/components/ui/Button'
import NotFound from './NotFound'

export default function Article() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  useSeo({ title: article?.title ?? 'Article not found', description: article?.excerpt, type: 'article' })
  if (!article) return <NotFound />

  const related = articles.filter((a) => a.slug !== article.slug).sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category)).slice(0, 3)

  return (
    <article>
      <header className="container-site pt-8 sm:pt-12">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Journal', to: '/journal' }, { label: article.title }]} />
        <div className="mx-auto mt-14 max-w-4xl text-center lg:mt-20">
          <p className="eyebrow flex items-center justify-center gap-3 text-taupe">
            <Link to={`/journal?category=${article.category}`} className="link-underline text-ink">
              {article.category}
            </Link>
            <span className="h-px w-5 bg-current opacity-40" aria-hidden="true" />
            {article.readingTime} min read
          </p>
          <h1 className="display-xl mt-6">{article.title}</h1>
          <p className="lede mx-auto mt-6 max-w-2xl text-taupe">{article.excerpt}</p>
          <p className="mt-8 text-sm text-taupe">
            By <span className="text-ink">{article.author}</span> · <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
        </div>
      </header>

      <figure className="container-site mt-14 sm:mt-20">
        <img src={article.image} alt={article.imageAlt} fetchPriority="high" className="aspect-[4/3] w-full bg-sand object-cover sm:aspect-[16/9]" />
      </figure>

      <div className="container-site py-16 sm:py-24">
        <div className="mx-auto max-w-[42rem] text-[1.08rem] leading-[1.8] text-charcoal">
          {article.body.map((block, i) => {
            switch (block.type) {
              case 'p':
                return (
                  <p key={i} className={i === 0 ? 'mt-0 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.8]' : 'mt-6'}>
                    {block.text}
                  </p>
                )
              case 'h2':
                return (
                  <h2 key={i} className="mt-14 font-display text-3xl leading-tight text-ink">
                    {block.text}
                  </h2>
                )
              case 'quote':
                return (
                  <blockquote key={i} className="my-14 border-y border-line py-10 text-center lg:-mx-16">
                    <p className="font-display text-[clamp(1.6rem,3vw,2.3rem)] italic leading-snug text-ink">“{block.text}”</p>
                    {block.cite && <footer className="eyebrow mt-5 text-taupe">— {block.cite}</footer>}
                  </blockquote>
                )
              case 'image':
                return (
                  <figure key={i} className="my-14 lg:-mx-16 xl:-mx-32">
                    <img src={block.src} alt={block.alt} loading="lazy" className="aspect-[4/3] w-full bg-sand object-cover" />
                    {block.caption && <figcaption className="mt-3 text-xs text-taupe">{block.caption}</figcaption>}
                  </figure>
                )
              default:
                return null
            }
          })}
          <div className="mt-16 flex items-center justify-between border-t border-line pt-6">
            <ArrowLink to="/journal">All stories</ArrowLink>
            <p className="text-xs text-taupe">Fictional editorial content.</p>
          </div>
        </div>
      </div>

      <section className="bg-cream">
        <div className="container-site section-y">
          <SectionHeader eyebrow="Keep reading" title={<>More from the <em>journal</em></>} />
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
