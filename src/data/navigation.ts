import { img } from '@/lib/asset'

export interface NavLink {
  label: string
  to: string
}

export interface MegaMenu {
  columns: { title: string; links: NavLink[] }[]
  feature: { image: string; alt: string; eyebrow: string; title: string; to: string }
}

export interface PrimaryNavItem extends NavLink {
  mega?: MegaMenu
}

/** Main navigation (desktop centre + mobile menu). */
export const primaryNav: PrimaryNavItem[] = [
  { label: 'New In', to: '/shop?new=1' },
  {
    label: 'Women',
    to: '/shop?category=women',
    mega: {
      columns: [
        {
          title: 'Clothing',
          links: [
            { label: 'All women', to: '/shop?category=women' },
            { label: 'Coats & jackets', to: '/product/aurelia-wool-coat' },
            { label: 'Dresses', to: '/product/selene-silk-slip-dress' },
            { label: 'Knitwear', to: '/product/maren-cashmere-knit' },
            { label: 'Tailoring', to: '/collections/atelier' },
          ],
        },
        {
          title: 'Shoes & bags',
          links: [
            { label: 'Shoes', to: '/shop?category=shoes' },
            { label: 'Bags', to: '/shop?category=bags' },
            { label: 'Accessories', to: '/shop?category=accessories' },
          ],
        },
      ],
      feature: {
        image: img('categories/women.svg'),
        alt: 'A champagne silk slip dress beneath a stone archway',
        eyebrow: 'Evening capsule',
        title: 'After dark, with restraint',
        to: '/collections/evening',
      },
    },
  },
  {
    label: 'Men',
    to: '/shop?category=men',
    mega: {
      columns: [
        {
          title: 'Clothing',
          links: [
            { label: 'All men', to: '/shop?category=men' },
            { label: 'Outerwear', to: '/product/lucien-overcoat' },
            { label: 'Knitwear', to: '/product/arlo-merino-crewneck' },
            { label: 'Shirts', to: '/product/teo-oxford-shirt' },
            { label: 'Tailoring', to: '/product/remy-unstructured-blazer' },
          ],
        },
        {
          title: 'Shoes & bags',
          links: [
            { label: 'Shoes', to: '/shop?category=shoes' },
            { label: 'Bags', to: '/shop?category=bags' },
            { label: 'Travel capsule', to: '/collections/travel' },
          ],
        },
      ],
      feature: {
        image: img('categories/men.svg'),
        alt: 'A grey overcoat in a dark gallery',
        eyebrow: 'Autumn / Winter 2026',
        title: 'The Lucien overcoat',
        to: '/product/lucien-overcoat',
      },
    },
  },
  {
    label: 'Collections',
    to: '/collections',
    mega: {
      columns: [
        {
          title: 'Collections',
          links: [
            { label: 'Autumn / Winter 2026', to: '/collections/autumn-winter-2026' },
            { label: 'Essentials', to: '/collections/essentials' },
            { label: 'Atelier', to: '/collections/atelier' },
            { label: 'Travel', to: '/collections/travel' },
            { label: 'Evening', to: '/collections/evening' },
          ],
        },
        {
          title: 'Explore',
          links: [
            { label: 'All collections', to: '/collections' },
            { label: 'The Maison', to: '/about' },
            { label: 'Journal', to: '/journal' },
          ],
        },
      ],
      feature: {
        image: img('collections/autumn-winter-2026.svg'),
        alt: 'A charcoal coat standing in a warm archway',
        eyebrow: 'Collection N°08',
        title: 'Autumn / Winter 2026',
        to: '/collections/autumn-winter-2026',
      },
    },
  },
  { label: 'Journal', to: '/journal' },
]

/** Footer link columns. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New In', to: '/shop?new=1' },
      { label: 'Women', to: '/shop?category=women' },
      { label: 'Men', to: '/shop?category=men' },
      { label: 'Shoes', to: '/shop?category=shoes' },
      { label: 'Bags', to: '/shop?category=bags' },
      { label: 'Accessories', to: '/shop?category=accessories' },
    ],
  },
  {
    title: 'Maison',
    links: [
      { label: 'About LUXEVA', to: '/about' },
      { label: 'Collections', to: '/collections' },
      { label: 'Journal', to: '/journal' },
      { label: 'Craftsmanship', to: '/about#craft' },
    ],
  },
  {
    title: 'Client services',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'FAQ', to: '/contact#faq' },
      { label: 'My account', to: '/account' },
      { label: 'Wishlist', to: '/wishlist' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'Terms of service', to: '/terms' },
    ],
  },
]
