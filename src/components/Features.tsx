import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'
import { Eyebrow, Reveal } from './ui'

const features = [
  {
    title: 'One team, every channel',
    body: 'Ads, Google presence, website, social, and AI call handling — all run by one team that actually talks to each other, so nothing falls through the cracks.',
    icon: 'M4 5h16v4H4V5zm0 6h16v4H4v-4zm0 6h10v2H4v-2z',
    span: 'sm:col-span-2',
  },
  {
    title: 'Fully managed',
    body: 'We do the work — strategy, build, and optimization. You just get the results.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
  },
  {
    title: 'Every lead captured',
    body: 'Your ads, site, and AI receptionist feed one pipeline — no missed calls, no lost leads.',
    icon: 'M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3 0-8 1.5-8 4.5V20h9v-2.5c0-1.2.5-2.3 1.3-3.2A13 13 0 0 0 8 13zm8 0a13 13 0 0 0-2.3.2A5.6 5.6 0 0 1 15 17.5V20h9v-2.5c0-3-5-4.5-8-4.5z',
  },
  {
    title: 'Built for local',
    body: 'Local SEO, Google Maps, and the 3-pack — we make you the obvious choice in your area.',
    icon: 'M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z',
  },
  {
    title: 'Real results, tracked',
    body: 'Live dashboards and reporting show exactly where your leads and revenue come from.',
    icon: 'M4 13h3v7H4v-7zm6.5-5h3v12h-3V8zM17 3h3v17h-3V3z',
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
    <section id="why" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Why Front Desk AI</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Your entire growth team, <span className="gradient-text">under one roof.</span>
          </h2>
          <p className="mt-5 text-white/60">
            Most businesses juggle an ad agency, a web guy, a social manager, and a phone they can't
            always answer. We replace all of it with one accountable team.
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
