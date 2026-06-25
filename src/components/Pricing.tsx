import { motion } from 'framer-motion'
import { Depth3D, Eyebrow, MagneticButton } from './ui'

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
    name: 'The Ultimate Ceramic',
    price: '$899',
    tagline: 'Correction + multi-year ceramic',
    includes: ['Everything in The Showroom', 'Multi-stage paint correction', 'Multi-year ceramic coating', 'Wheel-face ceramic coating', 'Hydrophobic glass coating', '5-year protection warranty'],
    featured: false,
  },
]

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-cyber-cyan" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Packages() {
  return (
    <section id="packages" className="relative py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyber-violet/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6">
        <Depth3D className="mx-auto max-w-2xl text-center" power={0.7}>
          <div className="flex justify-center">
            <Eyebrow>Packages</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Pick your shine. <span className="gradient-text">We bring it to you.</span>
          </h2>
          <p className="mt-5 text-white/60">
            Every package is fully mobile and performed right at your home or office. Upfront pricing,
            no hidden fees — book online in 60 seconds and we handle the rest.
          </p>
        </Depth3D>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {packages.map((plan) => (
            <Depth3D key={plan.name} className="h-full">
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative flex h-full flex-col rounded-3xl p-7 ${
                  plan.featured ? 'glass-strong glow-border shadow-glow-violet' : 'glass'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-900">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-white/50">{plan.tagline}</p>

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-xs uppercase tracking-wider text-white/40">from</span>
                  <span className="font-display text-4xl font-bold gradient-text">{plan.price}</span>
                </p>

                <ul className="mt-6 space-y-3 text-sm text-white/75">
                  {plan.includes.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <MagneticButton href="#contact" variant={plan.featured ? 'primary' : 'ghost'} className="w-full">
                    Book this package
                  </MagneticButton>
                </div>
              </motion.div>
            </Depth3D>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/40">
          Mobile service included free within 25 miles. SUVs, trucks, and heavily-soiled vehicles may
          vary — your exact price is confirmed at booking. Fleet &amp; recurring plans available too.
        </p>
      </div>
    </section>
  )
}
