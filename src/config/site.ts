/**
 * Global brand & store configuration.
 * Change the brand name, tagline, contact details and commerce rules here.
 */
export const site = {
  name: 'LUXEVA',
  /** Used in page titles: "Page — LUXEVA" */
  titleSuffix: 'LUXEVA',
  tagline: 'Designed for the moments that matter.',
  description:
    'LUXEVA is a fictional luxury fashion house — considered essentials, refined silhouettes and modern pieces designed to move with you.',
  /** Public URL of the deployed site, used for canonical and Open Graph tags. Set VITE_SITE_URL in .env */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '',
  ogImage: 'images/og-image.png',
  locale: 'en_US',

  contact: {
    email: 'concierge@luxeva.example',
    phone: '+1 (555) 014-2026',
    hours: 'Monday – Saturday, 9:00 – 19:00 (CET)',
    showroom: {
      name: 'LUXEVA Atelier & Showroom',
      lines: ['18 Rue de l’Exemple', '75003 Paris, France'],
      hours: 'By appointment, Tuesday – Saturday',
    },
  },

  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Pinterest', href: 'https://www.pinterest.com/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/' },
  ],

  commerce: {
    currency: 'USD',
    locale: 'en-US',
    freeShippingThreshold: 500,
    standardShipping: 25,
    /** Estimated sales tax shown at checkout (demo). Set to 0 to hide. */
    taxRate: 0,
  },

  /** localStorage key prefix — change if you run multiple demos on one domain */
  storagePrefix: 'luxeva',
} as const

export const deliveryMethods = [
  { id: 'standard', name: 'Standard delivery', detail: '3 – 5 business days', price: 25 },
  { id: 'express', name: 'Express delivery', detail: '1 – 2 business days', price: 45 },
  { id: 'atelier', name: 'Atelier courier', detail: 'Same day, selected cities', price: 65 },
] as const

export type DeliveryMethodId = (typeof deliveryMethods)[number]['id']
