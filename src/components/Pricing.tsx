import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Eyebrow, MagneticButton, Reveal } from './ui'

const plans = [
  {
    name: 'Starter',
    monthly: 49,
    tagline: 'For solo operators & new businesses',
    features: ['200 call minutes / mo', '24/7 AI call answering', 'Smart call summaries by text', 'Spam & robocall filtering', 'Email support'],
    featured: false,
  },
  {
    name: 'Growth',
    monthly: 99,
    tagline: 'For busy teams that live on the phone',
    features: ['600 call minutes / mo', 'Everything in Starter', 'Calendar booking & confirmations', 'CRM lead sync', 'Custom voice & scripts', 'Priority support'],
    featured: true,
  },
  {
    name: 'Scale',
    monthly: 249,
    tagline: 'For multi-location & high volume',
    features: ['Unlimited minutes', 'Everything in Growth', 'Multiple numbers & locations', 'Advanced analytics dashboard', 'API & workflow automations', 'Dedicated success manager'],
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

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="relative py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyber-violet/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Pricing</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Less than a day of wages. <span className="gradient-text">Working every day.</span>
          </h2>
          <p className="mt-5 text-white/60">
            One missed call can cost more than a month of FrontDeskAI. Start free — no card required.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full glass p-1">
            {(['monthly', 'annual'] as const).map((opt) => {
              const active = (opt === 'annual') === annual
              return (
                <button
                  key={opt}
                  onClick={() => setAnnual(opt === 'annual')}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
                    active ? 'text-ink-900' : 'text-white/70'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet"
                    />
                  )}
                  <span className="relative">{opt}</span>
                  {opt === 'annual' && (
                    <span className={`relative ml-1.5 text-xs ${active ? 'text-ink-900/70' : 'text-cyber-cyan'}`}>−20%</span>
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price = annual ? Math.round(plan.monthly * 0.8) : plan.monthly
            return (
              <Reveal key={plan.name} delay={i * 0.1}>
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

                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-2xl font-medium text-white/60">$</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={price}
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -16, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-display text-5xl font-bold gradient-text"
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                    <span className="mb-2 text-sm text-white/50">/mo</span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-white/70">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-2">
                    <MagneticButton
                      href="#cta"
                      variant={plan.featured ? 'primary' : 'ghost'}
                      className="w-full"
                    >
                      Start free trial
                    </MagneticButton>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
        <p className="mt-8 text-center text-sm text-white/40">
          14-day free trial · Cancel anytime · Setup in under 10 minutes
        </p>
      </div>
    </section>
  )
}
