import type { Look } from '@/types'
import { img } from '@/lib/asset'

export const looks: Look[] = [
  {
    id: 'look-01',
    number: '01',
    title: 'The long line',
    description: 'Double-face camel, pressed charcoal and polished espresso calf.',
    image: img('lookbook/look-01.svg'),
    productSlugs: ['aurelia-wool-coat', 'ines-pleated-trouser', 'ondine-leather-loafer', 'mira-top-handle-bag'],
  },
  {
    id: 'look-02',
    number: '02',
    title: 'Champagne hour',
    description: 'Bias-cut silk, a satin envelope and sculpted gold.',
    image: img('lookbook/look-02.svg'),
    productSlugs: ['selene-silk-slip-dress', 'luna-evening-clutch', 'cassia-slingback-heel', 'halo-sculpted-earrings'],
  },
  {
    id: 'look-03',
    number: '03',
    title: 'Sunday uniform',
    description: 'Merino, tobacco wool-linen and a cashmere wrap.',
    image: img('lookbook/look-03.svg'),
    productSlugs: ['arlo-merino-crewneck', 'noel-wide-trouser', 'pace-court-sneaker', 'elin-cashmere-scarf'],
  },
  {
    id: 'look-04',
    number: '04',
    title: 'Soft authority',
    description: 'Unstructured sand tailoring over crisp white poplin.',
    image: img('lookbook/look-04.svg'),
    productSlugs: ['remy-unstructured-blazer', 'odile-poplin-shirt', 'hale-chelsea-boot', 'cove-leather-belt'],
  },
  {
    id: 'look-05',
    number: '05',
    title: 'In transit',
    description: 'Brushed charcoal cashmere and a cabin-sized weekender.',
    image: img('lookbook/look-05.svg'),
    productSlugs: ['lucien-overcoat', 'voyage-weekender', 'orra-acetate-sunglasses'],
  },
  {
    id: 'look-06',
    number: '06',
    title: 'Mist & ink',
    description: 'Garment-washed Oxford, pleated ink and a saddle crossbody.',
    image: img('lookbook/look-06.svg'),
    productSlugs: ['teo-oxford-shirt', 'ines-pleated-trouser', 'nomad-crossbody'],
  },
]
