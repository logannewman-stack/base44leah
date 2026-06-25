import { Chip, Reveal } from './ui'
import { contactModal } from './useContactModal'

const plans = [
  {
    name: 'Starter',
    price: '$89',
    blurb: 'A sharp, clean exterior refresh.',
    features: ['Exterior hand wash', 'Tire shine', 'Windows in & out'],
    featured: false,
  },
  {
    name: 'Full Detail',
    price: '$199',
    blurb: 'Our most popular — inside and out.',
    features: ['Everything in Starter', 'Interior vacuum', 'Dashboard wipe-down', 'Leather conditioning'],
    featured: true,
  },
  {
    name: 'Ceramic Pro',
    price: '$599',
    blurb: 'Years of protection and deep gloss.',
    features: ['Everything in Full Detail', '2-year ceramic coating', 'Paint correction', 'Gloss enhancement'],
    featured: false,
  },
]

function Check({ light = false }: { light?: boolean }) {
  return (
    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${light ? 'bg-white/20 text-white' : 'bg-brand-tint text-brand-blueDark'}`}>
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

export default function Packages() {
  const book = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }
  return (
    <section id="packages" className="bg-brand-grey py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Chip>Pricing</Chip>
          </div>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-5 text-lg text-slate-600">
            No hidden fees, no surprises. Mobile service included free within 25 miles.
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((p) => {
            const f = p.featured
            return (
              <Reveal key={p.name} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-card p-8 ${
                    f ? 'bg-brand-blue text-white shadow-blue lg:-mt-4 lg:pb-12 lg:pt-12' : 'border border-slate-200 bg-white text-brand-ink shadow-card'
                  }`}
                >
                  {f && (
                    <span className="mb-5 inline-block w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-blueDark">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold">{p.name}</h3>
                  <p className={`mt-1 text-sm ${f ? 'text-white/80' : 'text-slate-500'}`}>{p.blurb}</p>
                  <p className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold tracking-[-0.02em]">{p.price}</span>
                    <span className={`text-sm ${f ? 'text-white/70' : 'text-slate-400'}`}>/ detail</span>
                  </p>

                  <ul className={`mt-8 space-y-3 text-sm ${f ? 'text-white/90' : 'text-slate-600'}`}>
                    {p.features.map((feat) => (
                      <li key={feat} className="flex gap-2.5">
                        <Check light={f} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 pt-2">
                    <a href="#contact" onClick={book} className={f ? 'btn-white w-full' : 'btn-primary w-full'}>
                      Book Now
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Next available: Tomorrow
          </span>
          <span className="hidden h-4 w-px bg-slate-300 sm:block" />
          <span>Fully insured &amp; licensed · 100% satisfaction guarantee</span>
        </Reveal>
      </div>
    </section>
  )
}
