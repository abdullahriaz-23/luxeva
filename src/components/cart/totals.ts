import { site } from '@/config/site'

/** Estimated shipping for the bag (before a delivery method is chosen). */
export const estimateShipping = (subtotal: number) =>
  subtotal === 0 || subtotal >= site.commerce.freeShippingThreshold ? 0 : site.commerce.standardShipping

export const estimateTax = (subtotal: number) => Math.round(subtotal * site.commerce.taxRate)
