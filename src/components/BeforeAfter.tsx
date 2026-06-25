import { Chip, Reveal } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

const items = [
  { label: 'Before', src: IMAGES.before, caption: 'Months of road grime, water spots, and a dull, neglected finish.', tone: 'bg-slate-900/80' },
  { label: 'After', src: IMAGES.after, caption: 'A deep-cleaned, protected, showroom-glossy finish — in one visit.', tone: 'bg-brand-blue' },
]

export default function BeforeAfter() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Chip>Real results</Chip>
          </div>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">The Results Speak for Themselves</h2>
          <p className="mt-5 text-lg text-slate-600">
            Same car, same day. This is the difference a professional detail makes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((it) => (
            <Reveal key={it.label}>
              <figure className="overflow-hidden rounded-card border border-slate-200 bg-white shadow-card">
                <div className="relative">
                  <Photo src={it.src} alt={`${it.label} detailing`} className="aspect-[4/3] w-full" />
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${it.tone}`}>
                    {it.label}
                  </span>
                </div>
                <figcaption className="px-6 py-5 text-sm text-slate-600">{it.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
