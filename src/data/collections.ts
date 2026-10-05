import type { Collection } from '@/types'
import { img } from '@/lib/asset'

/**
 * COLLECTIONS
 * Products are linked to a collection through `product.collections` in products.ts.
 */
export const collections: Collection[] = [
  {
    slug: 'autumn-winter-2026',
    name: 'Autumn / Winter 2026',
    season: 'Collection N°08',
    index: '01',
    tagline: 'Warmth, held in proportion.',
    description:
      'Long coats, dense knits and polished leather — a season built on weight, warmth and the quiet confidence of a perfect line.',
    statement: 'We designed this season around a single idea: that warmth should never come at the cost of form.',
    story: [
      'Autumn / Winter 2026 began in the archive, with a single coat pattern from our first season. We redrew it eleven times — lengthening the line, softening the shoulder, removing every seam that did not need to be there.',
      'The palette follows the light of late autumn: camel, charcoal, tobacco and ink, broken only by the warm glint of brushed brass. Fabrics are dense and honest — double-face wool, brushed cashmere, waxed suede.',
      'The result is a wardrobe meant to be layered and lived in, designed to look better in its fifth winter than its first.',
    ],
    heroImage: img('collections/autumn-winter-2026.svg'),
    campaignImage: img('campaign/hero.svg'),
    campaignCaption: 'The Aurelia coat, photographed in the atelier archway.',
  },
  {
    slug: 'essentials',
    name: 'Essentials',
    season: 'Permanent collection',
    index: '02',
    tagline: 'The pieces you reach for first.',
    description:
      'A permanent wardrobe of shirts, knits, trousers and leather goods — refined every season, never replaced.',
    statement: 'An essential is not a basic. It is the piece that has earned its place through years of wear.',
    story: [
      'Essentials is the foundation of LUXEVA: a tightly edited range that we continually refine rather than reinvent. A collar is narrowed by two millimetres; a knit moves to a finer gauge; a trouser rise is lifted by a centimetre.',
      'Each piece is designed to work with everything else in the collection, so a handful of garments becomes a complete wardrobe.',
    ],
    heroImage: img('collections/essentials.svg'),
    campaignImage: img('lookbook/look-03.svg'),
    campaignCaption: 'Merino, wool and leather — the essentials uniform.',
  },
  {
    slug: 'atelier',
    name: 'Atelier',
    season: 'Made in small runs',
    index: '03',
    tagline: 'Tailoring, by hand.',
    description:
      'Our most technical pieces — half-canvas tailoring, hand-stitched lapels and leather goods assembled by a single artisan.',
    statement: 'Some things cannot be hurried. Atelier pieces take between nine and forty hours to make.',
    story: [
      'The Atelier line is produced in small numbered runs with a handful of independent workshops. Jackets are built on a floating half-canvas and pressed by hand between every stage.',
      'Leather goods are cut from a single hide so that grain and tone match perfectly, then edge-painted in up to seven layers.',
    ],
    heroImage: img('collections/atelier.svg'),
    campaignImage: img('campaign/atelier.svg'),
    campaignCaption: 'Pieces awaiting final pressing in the atelier.',
  },
  {
    slug: 'travel',
    name: 'Travel',
    season: 'Capsule',
    index: '04',
    tagline: 'Pack less. Arrive composed.',
    description:
      'Crease-resistant tailoring, versatile knitwear and leather luggage designed to move from airport to dinner without compromise.',
    statement: 'The best travel wardrobe is the one you forget you packed.',
    story: [
      'Travel is a capsule of pieces engineered for movement: wool-linen trousers that shed creases overnight, merino that regulates temperature across climates and a weekender sized for the cabin.',
      'Everything folds flat, layers easily and works in any city.',
    ],
    heroImage: img('collections/travel.svg'),
    campaignImage: img('lookbook/look-05.svg'),
    campaignCaption: 'The Lucien overcoat and Voyage weekender.',
  },
  {
    slug: 'evening',
    name: 'Evening',
    season: 'Capsule',
    index: '05',
    tagline: 'After dark, with restraint.',
    description:
      'Silk, satin and sharp tailoring for evenings that call for something more — without ever trying too hard.',
    statement: 'Evening dressing should feel like a quieter, more intimate version of yourself.',
    story: [
      'The Evening capsule is built around fluid silk, sculpted gold and the precision of a single black blazer. Pieces are designed to be mixed with day wardrobe rather than kept for occasions.',
      'Every item is finished by hand, from rolled silk hems to polished brass hardware.',
    ],
    heroImage: img('collections/evening.svg'),
    campaignImage: img('lookbook/look-02.svg'),
    campaignCaption: 'The Selene slip dress with the Luna clutch.',
  },
]

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug)
