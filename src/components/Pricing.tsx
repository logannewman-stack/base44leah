import { Button, Eyebrow, Reveal } from './ui'
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

function Check({ dark = false }: { dark?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-black' : 'text-gold'}`} fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Packages() {
  return (
    <section id="packages" className="bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <Eyebrow>Packages</Eyebrow>
          </div>
          <h2 className="mt-5 h-display text-6xl text-white sm:text-7xl">
            Pick your <span className="text-gold">shine</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60">
            Every package is fully mobile and performed at your home or office. Upfront pricing, no
            hidden fees — book online in 60 seconds and we handle the rest.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {packages.map((plan) => {
            const featured = plan.featured
            return (
              <Reveal key={plan.name} className="h-full">
                <div
                  className={`flex h-full flex-col p-9 ${
                    featured ? 'bg-gold text-black' : 'border border-white/12 bg-ink-900 text-white'
                  }`}
                >
                  {featured && (
                    <span className="mb-5 inline-block w-fit bg-black px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest2 text-gold">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-4xl uppercase leading-none tracking-tightest">{plan.name}</h3>
                  <p className={`mt-2 text-sm ${featured ? 'text-black/70' : 'text-white/50'}`}>{plan.tagline}</p>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider2 ${featured ? 'text-black/60' : 'text-white/45'}`}>from</span>
                    <span className="font-display text-5xl uppercase tracking-tightest">{plan.price}</span>
                  </p>

                  <ul className={`mt-8 space-y-3 text-sm ${featured ? 'text-black/85' : 'text-white/75'}`}>
                    {plan.includes.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check dark={featured} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 pt-2">
                    {featured ? (
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault()
                          contactModal.open()
                        }}
                        className="flex w-full items-center justify-center gap-2 bg-black px-7 py-3.5 text-sm font-bold uppercase tracking-wider2 text-gold transition-colors hover:bg-ink-800"
                      >
                        Book this package
                      </a>
                    ) : (
                      <Button href="#contact" variant="outline" className="w-full">
                        Book this package
                      </Button>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-white/40">
          Mobile service included free within 25 miles. SUVs, trucks, and heavily-soiled vehicles may
          vary — your exact price is confirmed at booking. Fleet &amp; recurring plans available too.
        </p>
      </div>
    </section>
  )
}
