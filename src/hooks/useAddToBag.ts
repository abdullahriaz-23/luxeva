import { useCallback } from 'react'
import type { Product } from '@/types'
import { useCart, useToast, useUI } from './useStore'

/** Adds a product to the bag and gives feedback (opens the bag drawer or shows a toast). */
export function useAddToBag() {
  const { add } = useCart()
  const { openBag } = useUI()
  const { notify } = useToast()

  return useCallback(
    (product: Product, opts: { color: string; size: string; quantity?: number }, feedback: 'drawer' | 'toast' = 'drawer') => {
      add(product, opts)
      if (feedback === 'drawer') {
        openBag()
      } else {
        notify({
          title: 'Added to bag',
          description: `${product.name} — ${opts.color}${opts.size !== 'One Size' ? `, ${opts.size}` : ''}`,
          image: product.images[0],
          action: { label: 'View bag', to: '/cart' },
        })
      }
    },
    [add, openBag, notify],
  )
}
