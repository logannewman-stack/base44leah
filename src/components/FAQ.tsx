import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Eyebrow, MagneticButton, Reveal } from './ui'

const faqs = [
  {
    q: 'Do I have to take every service, or can I start with one?',
    a: 'Start wherever you need. Most clients bundle for the compounding effect, but you can begin with just the Voice AI receptionist, ads, your website, or your Google profile — and add more as you grow.',
  },
  {
    q: 'How quickly can we go live?',
    a: 'Your AI receptionist and Google profile can be live within days. Custom websites and full ad campaigns typically launch within one to two weeks, depending on scope and how fast we get your assets.',
  },
  {
    q: 'Will the AI actually sound human on calls?',
    a: 'Yes. The Voice AI answers in milliseconds with natural, on-brand conversation — it qualifies callers, books appointments straight into your calendar, and texts follow-ups. Most callers never realize it isn’t your front desk.',
  },
  {
    q: 'How do leads reach me?',
    a: 'Every lead — from ads, your website, or a captured call — flows into one CRM with a clean summary and the contact details. No sticky notes, no missed messages, no leads slipping through the cracks.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No lock-in tricks. We earn the relationship every month by delivering booked appointments and clear reporting. We’ll talk terms openly on your strategy call.',
  },
  {
    q: 'What does it cost?',
    a: 'Pricing depends on the mix of services and your market. Book a quick call and we’ll map out the right package and a transparent price — no jargon, no pressure.',
  },
]

function Item({ item, i }: { item: (typeof faqs)[number]; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={i * 0.05}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`w-full rounded-2xl border px-6 py-5 text-left transition-colors ${
          open ? 'glass-strong border-white/12' : 'glass border-white/8 hover:border-white/15'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-base font-semibold text-white sm:text-lg">{item.q}</span>
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 transition-colors ${open ? 'bg-cyber-cyan/15 ring-cyber-cyan/40 text-cyber-cyan' : 'ring-white/15 text-white/60'}`}>
            <motion.svg animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </motion.svg>
          </span>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pr-10 pt-4 text-[0.95rem] leading-relaxed text-white/60">{item.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </Reveal>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tightest text-balance sm:text-5xl">
            Questions, <span className="gradient-text">answered.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Still deciding? Here’s what business owners ask us most. Anything else — we’re one call away.
          </p>
          <div className="mt-8">
            <MagneticButton href="#contact">
              Speak with a representative
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <Item key={item.q} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
