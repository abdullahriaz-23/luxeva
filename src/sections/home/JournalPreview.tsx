import { articles } from '@/data/articles'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ArrowLink } from '@/components/ui/Button'
import { ArticleCard } from '@/components/editorial/ArticleCard'
import { Reveal } from '@/components/ui/Reveal'

export function JournalPreview() {
  const [lead, ...rest] = articles.slice(0, 3)
  return (
    <section aria-labelledby="journal-title" className="container-site pb-[var(--spacing-section)]">
      <SectionHeader
        id="journal-title"
        index="06"
        eyebrow="The Journal"
        title={
          <>
            Notes on <em>craft</em> & style
          </>
        }
        aside={<ArrowLink to="/journal">Read the journal</ArrowLink>}
      />
      <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12">
        <Reveal className="sm:col-span-2 lg:col-span-6">
          <ArticleCard article={lead} size="lg" />
        </Reveal>
        {rest.map((a, i) => (
          <Reveal key={a.slug} delay={(i + 1) * 100} className="lg:col-span-3">
            <ArticleCard article={a} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
