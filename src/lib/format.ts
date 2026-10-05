import { site } from '@/config/site'

const money = new Intl.NumberFormat(site.commerce.locale, {
  style: 'currency',
  currency: site.commerce.currency,
  maximumFractionDigits: 0,
})

export const formatPrice = (value: number) => money.format(value)

export const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString(site.commerce.locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

export const pad = (n: number, size = 2) => String(n).padStart(size, '0')
