import type { Product } from '@/types'
import { products, categoryLabel } from '@/data/products'
import { collections } from '@/data/collections'

const normalise = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

/** Weighted search across name, category, colours, collections and description. */
export function searchProducts(query: string, list: Product[] = products): Product[] {
  const q = normalise(query)
  if (!q) return []
  const terms = q.split(/\s+/).filter(Boolean)
  return list
    .map((p) => {
      const name = normalise(p.name)
      const fields = {
        name,
        category: normalise(categoryLabel(p.category)),
        colors: normalise(p.colors.map((c) => c.name).join(' ')),
        collections: normalise(
          p.collections.map((slug) => collections.find((c) => c.slug === slug)?.name ?? slug).join(' '),
        ),
        text: normalise(`${p.summary} ${p.description} ${p.composition}`),
      }
      let score = 0
      for (const t of terms) {
        let hit = 0
        if (fields.name.startsWith(t)) hit += 10
        if (fields.name.includes(t)) hit += 6
        if (fields.category.includes(t)) hit += 5
        if (fields.colors.includes(t)) hit += 3
        if (fields.collections.includes(t)) hit += 3
        if (fields.text.includes(t)) hit += 1
        if (hit === 0) return { p, score: 0 }
        score += hit
      }
      return { p, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p)
}

export const popularSearches = ['Coat', 'Cashmere', 'Silk', 'Loafer', 'Leather bag', 'Evening']
