import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './ui'

const steps = [
  {
    n: '01',
    title: 'A call comes in',
    body: 'The moment your phone rings — 3am, weekends, holidays, or while you’re with a customer — the AI picks up in under a second. Zero rings to voicemail.',
    icon: 'M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z',
  },
  {
    n: '02',
    title: 'It speaks like you',
    body: 'Trained on your business, hours, services and FAQs, the AI answers questions naturally — warm, on-brand, and indistinguishable from your best receptionist.',
    icon: 'M12 3a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h2v-7H6v-1a6 6 0 1 1 12 0v1h-2v7h2a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9z',
  },
  {
    n: '03',
    title: 'It books the job',
    body: 'It checks real-time availability, schedules the appointment in your calendar, and sends confirmations — turning a ringing phone into a booked customer.',
    icon: 'M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zM5 9h14v10H5V9zm6 2v2H9v2h2v2h2v-2h2v-2h-2v-2h-2z',
  },
  {
    n: '04',
    title: 'You get the summary',
    body: 'Every call is transcribed, summarized, and pushed to your CRM with the lead’s details. Nothing slips through. You wake up to a full pipeline.',
    icon: 'M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h10v2H4v-2zm0 5h10v2H4v-2zm13.5-4L21 18l-3.5 4-2-2 1.5-1.5-3-3 2-2 3 3z',
  },
]

function Step({ step, i, progress }: { step: (typeof steps)[number]; i: number; progress: MotionValue<number> }) {
  const start = i / steps.length
  const end = (i + 1) / steps.length
  // All breakpoints MUST stay within [0, 1] and strictly increasing. framer-motion
  // offloads these scroll-linked fades to the Web Animations API, which rejects
  // out-of-range offsets (e.g. a negative value) by throwing during mount.
  const lead = start + 0.06
  const tail = end - 0.06
  const opacity = useTransform(progress, [start, lead, tail, end], [0.2, 1, 1, 0.2])
  const x = useTransform(progress, [start, lead], [80, 0])
  const scale = useTransform(progress, [start, lead, end], [0.96, 1, 0.98])

  return (
    <motion.div style={{ opacity, x, scale }} className="flex min-h-screen items-center">
      <div className="glass-strong glow-border relative w-full rounded-3xl p-8 sm:p-10">
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl font-bold text-white/15">{step.n}</span>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/20">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-cyber-cyan" fill="currentColor">
              <path d={step.icon} />
            </svg>
          </span>
        </div>
        <h3 className="mt-6 font-display text-3xl font-bold text-white">{step.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-white/65">{step.body}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '320%'])

  return (
    <section id="how" ref={ref} className="relative">
      {/* Sticky left rail with heading + progress */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1fr]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Watch a call become a <span className="gradient-text">booked customer.</span>
          </h2>
          <p className="mt-5 max-w-md text-white/60">
            Scroll to follow a single phone call as it flows through the AI front desk —
            from first ring to a confirmed appointment in your calendar.
          </p>

          <div className="relative mt-10 hidden h-48 w-1 rounded-full bg-white/10 lg:block">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-cyber-cyan to-cyber-violet"
            />
            <motion.span
              style={{ top: orbY }}
              className="absolute -left-2 h-5 w-5 -translate-y-1/2 rounded-full bg-cyber-cyan shadow-glow"
            />
          </div>
        </div>

        {/* The scrolling steps */}
        <div>
          {steps.map((step, i) => (
            <Step key={step.n} step={step} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
