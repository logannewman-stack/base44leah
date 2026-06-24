import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'
import { Eyebrow, Reveal } from './ui'

const features = [
  {
    title: '24/7 Voice Reception',
    body: 'A natural-sounding AI answers every call instantly, any hour, in a voice trained on your brand.',
    icon: 'M12 3a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h2v-7H6v-1a6 6 0 1 1 12 0v1h-2v7h2a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9z',
    span: 'sm:col-span-2',
  },
  {
    title: 'Smart Appointment Booking',
    body: 'Reads your live calendar, offers open slots, books, and sends confirmations automatically.',
    icon: 'M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zM5 9h14v10H5V9z',
  },
  {
    title: 'Instant Lead Capture',
    body: 'Names, numbers, and intent logged to your CRM the second the call ends.',
    icon: 'M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3 0-8 1.5-8 4.5V20h9v-2.5c0-1.2.5-2.3 1.3-3.2A13 13 0 0 0 8 13zm8 0a13 13 0 0 0-2.3.2A5.6 5.6 0 0 1 15 17.5V20h9v-2.5c0-3-5-4.5-8-4.5z',
  },
  {
    title: 'Call Summaries & Transcripts',
    body: 'Every conversation transcribed and summarized, delivered by text and email.',
    icon: 'M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h10v2H4v-2zm0 5h10v2H4v-2z',
  },
  {
    title: 'Spam & Robocall Filtering',
    body: 'Junk calls screened out so only real customers reach your pipeline.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
    span: 'sm:col-span-2',
  },
]

function TiltCard({ feature, i }: { feature: (typeof features)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 })

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <Reveal delay={i * 0.06} className={feature.span ?? ''}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0)
          my.set(0)
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', transformPerspective: 900 }}
        className="group glass relative h-full overflow-hidden rounded-3xl p-7"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyber-violet/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <span
          style={{ transform: 'translateZ(40px)' }}
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/20 text-cyber-cyan"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d={feature.icon} />
          </svg>
        </span>
        <h3 style={{ transform: 'translateZ(28px)' }} className="mt-5 font-display text-xl font-semibold text-white">
          {feature.title}
        </h3>
        <p style={{ transform: 'translateZ(18px)' }} className="mt-2 text-white/60">
          {feature.body}
        </p>
      </motion.div>
    </Reveal>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Capabilities</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Everything a great receptionist does. <span className="gradient-text">Never off the clock.</span>
          </h2>
          <p className="mt-5 text-white/60">
            One AI front desk replaces the missed calls, the voicemail tag, and the lost leads —
            with capabilities no human team can match.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {features.map((f, i) => (
            <TiltCard key={f.title} feature={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
