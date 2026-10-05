export type Category = 'women' | 'men' | 'shoes' | 'bags' | 'accessories'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  price: number
  /** Short sentence used on cards, quick view and search */
  summary: string
  description: string
  details: string[]
  composition: string
  care: string
  madeIn: string
  /** First image is the primary, second is used for the hover swap */
  images: string[]
  colors: ProductColor[]
  sizes: string[]
  soldOutSizes?: string[]
  featured: boolean
  newArrival: boolean
  /** Collection slugs this product belongs to */
  collections: string[]
  /** ISO date — used for "Newest" sorting */
  addedAt: string
}

export interface Collection {
  slug: string
  name: string
  season: string
  index: string
  tagline: string
  description: string
  statement: string
  story: string[]
  heroImage: string
  campaignImage: string
  campaignCaption: string
}

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type ArticleCategory = 'Collections' | 'Craft' | 'Style' | 'Travel' | 'Care'

export interface Article {
  slug: string
  title: string
  category: ArticleCategory
  excerpt: string
  date: string
  readingTime: number
  author: string
  image: string
  imageAlt: string
  body: ArticleBlock[]
}

export interface Look {
  id: string
  number: string
  title: string
  description: string
  image: string
  productSlugs: string[]
}

export interface CartLine {
  /** Unique key: productId|color|size */
  key: string
  productId: string
  color: string
  size: string
  quantity: number
}

export interface Order {
  id: string
  date: string
  lines: { productId: string; name: string; color: string; size: string; quantity: number; price: number; image: string }[]
  subtotal: number
  shipping: number
  total: number
  delivery: string
  status: 'Processing' | 'Shipped' | 'Delivered'
}
