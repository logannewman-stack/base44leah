import { motion } from 'framer-motion'
import { Depth3D, Eyebrow, MagneticButton } from './ui'

const packages = [
  {
    name: 'Full Growth Suite',
    tagline: 'The complete done-for-you system',
    includes: ['Google My Business', 'Custom Website', 'CRM Build-Out', 'Voice AI Receptionist', 'Meta & Google Ads'],
    featured: true,
  },
  {
    name: 'Local Presence Suite',
    tagline: 'Dominate local search & automate',
    includes: ['Google My Business', 'CRM Build-Out', 'Voice AI Receptionist', 'Meta & Google Ads'],
    featured: false,
  },
  {
    name: 'Digital Launch Suite',
    tagline: 'A new web presence, fully automated',
    includes: ['Custom Website', 'CRM Build-Out', 'Voice AI Receptionist', 'Meta & Google Ads'],
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
            Built around your business. <span className="gradient-text">Fully managed.</span>
          </h2>
          <p className="mt-5 text-white/60">
            Bundle everything or pick the services you need — every package is done-for-you and
            tailored to your goals. Let's map out the right fit on a quick call.
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
                    Speak with a representative
                  </MagneticButton>
                </div>
              </motion.div>
            </Depth3D>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/40">
          Prefer just one service? We offer Meta Ads, Google My Business, Websites, Social Media, and
          the Voice AI Caller individually too — just ask.
        </p>
      </div>
    </section>
  )
}
