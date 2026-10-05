import type { Product } from '@/types'

/** Picks the most relevant size-guide table for a product. */
export const sizeTableFor = (p: Product) => {
  if (p.category === 'men') return 'men'
  if (p.category === 'shoes') return 'shoes'
  if (p.slug.includes('belt')) return 'belts'
  return 'women'
}
