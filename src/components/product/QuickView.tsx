import { useId, useState } from 'react'
import { Link } from 'react-router'
import type { Product } from '@/types'
import { availableSizes, categoryLabel, isSingleSize } from '@/data/products'
import { useUI } from '@/hooks/useStore'
import { useAddToBag } from '@/hooks/useAddToBag'
import { Dialog, CloseButton } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { ColorSelector } from './ColorSelector'
import { SizeSelector } from './SizeSelector'
import { WishlistButton } from './WishlistButton'
import { PriceTag } from './PriceTag'
import { sizeTableFor } from './sizeTableFor'
import { cn } from '@/lib/cn'

/** Global quick-view modal. Opened via useUI().openQuickView(product). */
export function QuickView() {
  const { quickView, closeQuickView } = useUI()
  const [last, setLast] = useState<Product | null>(quickView)
  if (quickView && quickView !== last) setLast(quickView)
  const product = quickView ?? last
  const titleId = useId()

  return (
    <Dialog open={Boolean(quickView)} onClose={closeQuickView} labelledBy={titleId} variant="center">
      {product && <QuickViewBody key={product.id} product={product} titleId={titleId} onClose={closeQuickView} />}
    </Dialog>
  )
}

function QuickViewBody({ product, titleId, onClose }: { product: Product; titleId: string; onClose: () => void }) {
  const { openSizeGuide } = useUI()
  const addToBag = useAddToBag()
  const single = isSingleSize(product)
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState(single ? product.sizes[0] : '')
  const [image, setImage] = useState(0)
  const [error, setError] = useState(false)
  const soldOutAll = availableSizes(product).length === 0

  const submit = () => {
    if (!size) {
      setError(true)
      return
    }
    onClose()
    addToBag(product, { color, size })
  }

  return (
    <div className="relative grid min-h-0 flex-1 overflow-y-auto sm:grid-cols-[1.05fr_1fr] sm:overflow-hidden">
      <CloseButton onClick={onClose} className="absolute right-2 top-2 z-10 bg-ivory/80 sm:bg-transparent" label="Close quick view" />

      <div className="relative bg-sand sm:min-h-0">
        <img src={product.images[image]} alt={`${product.name} — view ${image + 1}`} className="aspect-[4/5] w-full object-cover sm:h-full sm:aspect-auto" />
        <div className="absolute bottom-3 left-3 flex gap-2" role="group" aria-label="Choose image">
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setImage(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={image === i}
              className={cn('h-14 w-11 overflow-hidden border transition-colors', image === i ? 'border-ink' : 'border-transparent opacity-80 hover:opacity-100')}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-7 p-6 sm:overflow-y-auto sm:p-10">
        <div>
          <p className="eyebrow text-taupe">{categoryLabel(product.category)}</p>
          <h2 id={titleId} className="mt-3 font-display text-3xl leading-tight sm:text-[2.1rem]">
            {product.name}
          </h2>
          <PriceTag price={product.price} className="mt-3 block text-lg" />
          <p className="mt-5 text-[0.95rem] leading-relaxed text-taupe">{product.summary}</p>
        </div>

        <ColorSelector colors={product.colors} value={color} onChange={setColor} />
        {!single && (
          <SizeSelector
            sizes={product.sizes}
            soldOut={product.soldOutSizes}
            value={size}
            onChange={(s) => {
              setSize(s)
              setError(false)
            }}
            onSizeGuide={() => openSizeGuide(sizeTableFor(product))}
            error={error}
          />
        )}

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex gap-2">
            <Button size="lg" className="flex-1" onClick={submit} disabled={soldOutAll}>
              {soldOutAll ? 'Sold out' : 'Add to bag'}
            </Button>
            <WishlistButton product={product} className="size-14 border border-line-strong" />
          </div>
          <Link to={`/product/${product.slug}`} className="eyebrow self-start link-underline-static py-2">
            View full details
          </Link>
        </div>
      </div>
    </div>
  )
}
