import { Icon } from './Icon'
import { cn } from '@/lib/cn'

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  label = 'quantity',
  size = 'md',
  className,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label?: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const h = size === 'sm' ? 'h-10' : 'h-12'
  return (
    <div className={cn('inline-flex items-center border border-line-strong', h, className)} role="group" aria-label={label.charAt(0).toUpperCase() + label.slice(1)}>
      <button
        type="button"
        className={cn('flex items-center justify-center transition-opacity hover:opacity-60 disabled:opacity-25', h, size === 'sm' ? 'w-10' : 'w-12')}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        <Icon name="minus" size={14} />
      </button>
      <output className="min-w-8 text-center text-sm tabular-nums" aria-live="polite" aria-label={`${label.charAt(0).toUpperCase() + label.slice(1)}: ${value}`}>
        {value}
      </output>
      <button
        type="button"
        className={cn('flex items-center justify-center transition-opacity hover:opacity-60 disabled:opacity-25', h, size === 'sm' ? 'w-10' : 'w-12')}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        <Icon name="plus" size={14} />
      </button>
    </div>
  )
}
