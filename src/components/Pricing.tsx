import { Button, Chip, Reveal } from './ui'
import { contactModal } from './useContactModal'

const packages = [
  {
    name: 'The Refresh',
    price: '$149',
    tagline: 'Quick inside-and-out refresh',
    includes: ['Hand wash & hand dry', 'Wheels, tires & tire shine', 'Full interior vacuum', 'Windows in & out', 'Dash & console wipe-down'],
    featured: false,
  },
  {
    name: 'The Showroom',
    price: '$349',
    tagline: 'Our most-loved full detail',
    includes: ['Everything in The Refresh', 'Clay-bar decontamination', 'Interior deep clean & steam', 'Leather clean & condition', '6-month paint sealant', 'Engine bay wipe-down'],
    featured: true,
  },
  {
    name: 'Ultimate Ceramic',
    price: '$899',
    tagline: 'Correction + multi-year ceramic',
    includes: ['Everything in The Showroom', 'Multi-stage paint correction', 'Multi-year ceramic coating', 'Wheel-face ceramic coating', 'Hydrophobic glass coating', '5-year protection warranty'],
    featured: false,
  },
]

function Check({ light = false }: { light?: boolean }) {
  return (
    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${light ? 'bg-white/15 text-brand-sky' : 'bg-brand-tint text-brand-blueDark'}`}>
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

export default function Packages() {
  return (
    <section id="packages" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Chip>Packages</Chip>
          </div>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">
            Simple, upfront <span className="text-brand-blue">pricing.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            Every package is fully mobile and performed at your home or office. No hidden fees — book
            online in 60 seconds.
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-7 lg:grid-cols-3">
          {packages.map((plan) => {
            const f = plan.featured
            return (
              <Reveal key={plan.name} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-3xl p-8 ${
                    f ? 'bg-brand-ink text-white shadow-soft lg:-mt-4 lg:pb-12 lg:pt-12' : 'border border-slate-200 bg-white text-brand-ink shadow-card'
                  }`}
                >
                  {f && (
                    <span className="mb-5 inline-block w-fit rounded-full bg-brand-blue px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                  <p className={`mt-1 text-sm ${f ? 'text-white/60' : 'text-slate-500'}`}>{plan.tagline}</p>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${f ? 'text-white/50' : 'text-slate-400'}`}>from</span>
                    <span className="font-display text-5xl font-extrabold tracking-[-0.02em]">{plan.price}</span>
                  </p>

                  <ul className={`mt-8 space-y-3 text-sm ${f ? 'text-white/85' : 'text-slate-600'}`}>
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check light={f} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 pt-2">
                    {f ? (
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault()
                          contactModal.open()
                        }}
                        className="btn-primary w-full"
                      >
                        Book this package
                      </a>
                    ) : (
                      <Button href="#contact" variant="ghost" className="w-full">
                        Book this package
                      </Button>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          Mobile service included free within 25 miles. SUVs, trucks, and heavily-soiled vehicles may
          vary — your exact price is confirmed at booking. Fleet &amp; recurring plans available too.
        </p>
      </div>
    </section>
  )
}
