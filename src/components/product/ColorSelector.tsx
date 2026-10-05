import { useId } from 'react'
import type { ProductColor } from '@/types'
import { cn } from '@/lib/cn'

/** Native radio group styled as colour swatches — fully keyboard accessible. */
export function ColorSelector({
  colors,
  value,
  onChange,
}: {
  colors: ProductColor[]
  value: string
  onChange: (name: string) => void
}) {
  const name = useId()
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-taupe">
        Colour — <span className="text-ink">{value}</span>
      </legend>
      <div className="flex flex-wrap gap-3">
        {colors.map((c) => (
          <label key={c.name} className="relative cursor-pointer" title={c.name}>
            <input
              type="radio"
              name={name}
              value={c.name}
              checked={value === c.name}
              onChange={() => onChange(c.name)}
              className="peer sr-only"
            />
            <span className="sr-only">{c.name}</span>
            <span
              className={cn(
                'flex size-10 items-center justify-center rounded-full border border-transparent transition-colors',
                'peer-checked:border-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink',
              )}
              aria-hidden="true"
            >
              <span className="size-7 rounded-full ring-1 ring-ink/15 ring-inset" style={{ backgroundColor: c.hex }} />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
