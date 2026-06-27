import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow, Reveal } from './ui'

const steps = [
  {
    n: '01',
    title: 'Discovery & strategy',
    body: 'We learn your business, your market, and your goals — then map the exact mix of channels that will move the needle fastest.',
    icon: 'M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z',
    stroke: true,
  },
  {
    n: '02',
    title: 'Build & integrate',
    body: 'We build your website, Google profile, ad campaigns, and AI receptionist — all wired into one CRM so every lead lands in one place.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
    stroke: false,
  },
  {
    n: '03',
    title: 'Launch & capture',
    body: 'We go live across every channel at once. Calls get answered in milliseconds, leads get qualified, and appointments start booking themselves.',
    icon: 'M5 13l4 4L19 7M12 2v3M4.9 6.3l2.1 2.1M2 13h3',
    stroke: true,
  },
  {
    n: '04',
    title: 'Optimize & scale',
    body: 'We watch the numbers, double down on what works, and keep tuning — so your cost per lead drops while your booked revenue climbs.',
    icon: 'M4 13h3v7H4v-7zm6.5-5h3v12h-3V8zM17 3h3v17h-3V3z',
    stroke: false,
  },
]

function StepCard({ step, i }: { step: (typeof steps)[number]; i: number }) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Reveal delay={i * 0.08} className="relative">
      <motion.div
        onMouseMove={onMove}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        className="spotlight group relative h-full overflow-hidden rounded-[1.75rem] glass p-7 shadow-card"
      >
        {/* ghost step number watermark */}
        <span className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[6rem] font-extrabold leading-none text-white/[0.04]">
          {step.n}
        </span>

        <div className="relative flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/20 ring-1 ring-white/10">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyber-cyan" fill={step.stroke ? 'none' : 'currentColor'} stroke={step.stroke ? 'currentColor' : 'none'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={step.icon} />
            </svg>
          </span>
          <span className="font-display text-sm font-bold tracking-[0.3em] text-cyber-cyan/80">{step.n}</span>
        </div>

        <h3 className="relative mt-6 font-display text-xl font-bold text-white">{step.title}</h3>
        <p className="relative mt-3 text-[0.95rem] leading-relaxed text-white/60">{step.body}</p>
      </motion.div>
    </Reveal>
  )
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tightest text-balance sm:text-5xl">
            From first call to <span className="gradient-text">a full pipeline</span> — in four steps.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
            No hand-offs, no agencies blaming each other. One team owns the whole engine,
            end to end, and reports on what actually matters: booked revenue.
          </p>
        </div>

        <div className="relative mt-16">
          {/* connecting progress line behind the cards (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[3.4rem] hidden h-px bg-white/8 lg:block">
            <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-magenta" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <StepCard key={step.n} step={step} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
