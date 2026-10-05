import { Link } from 'react-router'
import type { MegaMenu } from '@/data/navigation'
import { cn } from '@/lib/cn'

export function MegaPanel({ menu, open, id, label }: { menu: MegaMenu; open: boolean; id: string; label: string }) {
  return (
    <div
      id={id}
      className={cn(
        'absolute inset-x-0 top-full border-y border-line bg-ivory transition-[opacity,visibility,translate] duration-400 ease-luxe',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
      )}
    >
      <div className="container-site grid grid-cols-12 gap-8 py-12">
        <p className="col-span-3 display-md self-start italic">{label}</p>
        {menu.columns.map((col) => (
          <div key={col.title} className="col-span-2">
            <p className="eyebrow mb-5 text-taupe">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="link-underline text-[0.95rem]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link to={menu.feature.to} className="group col-span-4 col-start-9 grid grid-cols-[1fr_1.1fr] items-end gap-6">
          <div className="overflow-hidden bg-sand">
            <img src={menu.feature.image} alt={menu.feature.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-[scale] duration-1000 ease-luxe group-hover:scale-[1.04]" />
          </div>
          <div className="pb-1">
            <p className="eyebrow text-taupe">{menu.feature.eyebrow}</p>
            <p className="mt-3 font-display text-2xl leading-tight">{menu.feature.title}</p>
            <span className="eyebrow mt-4 inline-block link-underline-static">Discover</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
