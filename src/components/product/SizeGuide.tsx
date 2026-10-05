import { useId, useState, type KeyboardEvent } from 'react'
import { sizeTables } from '@/data/sizeGuide'
import { useUI } from '@/hooks/useStore'
import { Dialog, CloseButton } from '@/components/ui/Dialog'
import { cn } from '@/lib/cn'

/** Global size-guide modal with tabbed tables and cm / inch toggle. */
export function SizeGuide() {
  const { sizeGuide, closeSizeGuide } = useUI()
  const titleId = useId()
  return (
    <Dialog open={Boolean(sizeGuide)} onClose={closeSizeGuide} labelledBy={titleId} variant="center" className="sm:w-[min(92vw,52rem)]">
      {sizeGuide && <SizeGuideBody key={sizeGuide} initial={sizeGuide} titleId={titleId} onClose={closeSizeGuide} />}
    </Dialog>
  )
}

function SizeGuideBody({ initial, titleId, onClose }: { initial: string; titleId: string; onClose: () => void }) {
  const [tab, setTab] = useState(initial)
  const [unit, setUnit] = useState<'cm' | 'in'>('cm')
  const table = sizeTables.find((t) => t.id === tab) ?? sizeTables[0]
  const baseId = useId()

  const fmt = (v: string | number, col: number) => {
    if (typeof v !== 'number' || !table.convertible.includes(col)) return v
    return unit === 'cm' ? v : (v / 2.54).toFixed(1)
  }

  const onTabKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = sizeTables[(i + (e.key === 'ArrowRight' ? 1 : -1) + sizeTables.length) % sizeTables.length]
    setTab(next.id)
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-line px-6 pb-5 pt-6 sm:px-10 sm:pt-9">
        <div>
          <p className="eyebrow text-taupe">Fit & measurements</p>
          <h2 id={titleId} className="mt-2 font-display text-3xl">Size guide</h2>
        </div>
        <CloseButton onClick={onClose} label="Close size guide" className="-mr-3 -mt-2" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-6 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="Size tables" className="flex flex-wrap gap-x-6 gap-y-2">
            {sizeTables.map((t, i) => (
              <button
                key={t.id}
                id={`${baseId}-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                aria-controls={`${baseId}-panel`}
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={cn('label py-2 transition-colors', tab === t.id ? 'text-ink link-underline-static' : 'text-taupe hover:text-ink')}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="inline-flex border border-line-strong" role="group" aria-label="Measurement unit">
            {(['cm', 'in'] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={cn('h-9 px-4 text-xs uppercase tracking-[0.16em] transition-colors', unit === u ? 'bg-ink text-ivory' : 'hover:bg-cream')}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab}`} className="mt-6">
          <p className="text-sm text-taupe">{table.note}</p>
          <div className="mt-5 overflow-x-auto border border-line" tabIndex={0} aria-label={`${table.label} size table`}>
            <table className="w-full min-w-[30rem] border-collapse text-sm tabular-nums">
              <thead>
                <tr className="bg-cream">
                  {table.columns.map((c, i) => (
                    <th key={c} scope="col" className="px-4 py-3 text-left text-[0.66rem] font-medium uppercase tracking-[0.16em]">
                      {c}
                      {table.convertible.includes(i) && <span className="normal-case tracking-normal text-taupe"> ({unit})</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={String(row[0])} className="border-t border-line">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-3 text-left font-medium">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="px-4 py-3">
                          {fmt(cell, i)}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-line pt-6 text-sm text-taupe sm:grid-cols-3">
          <p><span className="eyebrow mb-2 block text-ink">Chest / bust</span>Measure around the fullest part, keeping the tape horizontal.</p>
          <p><span className="eyebrow mb-2 block text-ink">Waist</span>Measure around your natural waistline, the narrowest point.</p>
          <p><span className="eyebrow mb-2 block text-ink">Hip</span>Measure around the fullest part of your hips, feet together.</p>
        </div>
        <p className="mt-6 text-xs text-taupe">Measurements are illustrative demo values.</p>
      </div>
    </div>
  )
}
