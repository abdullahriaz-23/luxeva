import { useId } from 'react'
import { cn } from '@/lib/cn'

/** Native radio group styled as size tiles. Sold-out sizes are disabled and struck through. */
export function SizeSelector({
  sizes,
  soldOut = [],
  value,
  onChange,
  onSizeGuide,
  error,
}: {
  sizes: string[]
  soldOut?: string[]
  value: string
  onChange: (size: string) => void
  onSizeGuide?: () => void
  error?: boolean
}) {
  const name = useId()
  return (
    <fieldset aria-describedby={error ? `${name}-err` : undefined}>
      <legend className="sr-only">Size</legend>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="eyebrow text-taupe" aria-hidden="true">
          Size{value ? <> — <span className="text-ink">{value}</span></> : null}
        </p>
        {onSizeGuide && (
          <button type="button" onClick={onSizeGuide} className="eyebrow link-underline-static text-ink">
            Size guide
          </button>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(3.25rem,1fr))] gap-2">
        {sizes.map((s) => {
          const disabled = soldOut.includes(s)
          return (
            <label key={s} className={cn('relative', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
              <input
                type="radio"
                name={name}
                value={s}
                checked={value === s}
                disabled={disabled}
                onChange={() => onChange(s)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  'flex h-12 items-center justify-center border text-sm tabular-nums transition-colors duration-200',
                  'border-line-strong hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory',
                  'peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink',
                  disabled && 'border-line text-taupe/60 line-through hover:border-line',
                  error && !value && 'border-danger/60',
                )}
              >
                {s}
                {disabled && <span className="sr-only"> (sold out)</span>}
              </span>
            </label>
          )
        })}
      </div>
      {error && (
        <p id={`${name}-err`} className="mt-3 text-xs text-danger" role="alert">
          Please select a size.
        </p>
      )}
    </fieldset>
  )
}
