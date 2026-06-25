import { booking } from './useBooking'

const plans = [
  {
    name: 'Express Shine',
    price: '$89',
    tagline: 'The quick refresh that turns heads',
    features: ['Snow-foam hand wash', 'Wheels & tires cleaned', 'Streak-free hand dry', 'Windows in & out', 'Quick interior vacuum'],
    featured: false,
  },
  {
    name: 'Full Detail',
    price: '$249',
    tagline: 'Inside and out, top to bottom',
    features: ['Everything in Express', 'Iron decon & clay treatment', 'Wheel barrels & calipers', 'Deep interior extraction', 'Steam & surface dressing', 'Spray sealant gloss boost'],
    featured: true,
  },
  {
    name: 'Showroom Ceramic',
    price: '$899',
    tagline: 'Correction + years of protection',
    features: ['Everything in Full Detail', 'Multi-stage paint correction', 'Certified ceramic coating', 'Hydrophobic glass coating', 'Up to 5-year protection'],
    featured: false,
  },
]

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Packages</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl">
            Simple pricing. <span className="text-brand-400">Showroom results.</span>
          </h2>
          <p className="mt-4 text-white/65">
            Pricing starts here and is tailored to your vehicle's size and condition. Not sure
            which fits? Book a quick consult and we'll recommend the right detail.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                p.featured ? 'border-brand-500 bg-ink-800' : 'border-white/10 bg-ink-850'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-white/50">{p.tagline}</p>
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-xs uppercase tracking-widest text-white/40">from</span>
                <span className="font-display text-4xl font-extrabold text-white">{p.price}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-white/75">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => booking.open()} className={`mt-8 w-full ${p.featured ? 'btn-primary' : 'btn-ghost'}`}>
                Book this package
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/40">
          Larger vehicles, trucks and heavily-soiled interiors may vary — you'll always get an exact quote before we start.
        </p>
      </div>
    </section>
  )
}
