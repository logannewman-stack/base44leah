import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { Eyebrow } from './ui'

const services = [
  {
    key: 'meta',
    name: 'Meta Ads',
    label: 'Facebook & Instagram',
    blurb:
      'Fully managed paid campaigns on Facebook and Instagram — strategy, creative, and relentless optimization that puts your offer in front of the right people.',
    points: ['Campaign strategy & creative', 'Precise audience targeting', 'Ongoing optimization & reporting', 'Every lead captured automatically'],
    icon: 'M3 11l18-7-7 18-2.5-7.5L3 11z',
    color: 'from-sky-400 to-blue-600',
  },
  {
    key: 'gmb',
    name: 'Google My Business',
    label: 'Local visibility',
    blurb:
      'We create and fully optimize your Google Business Profile so you show up in local search, Google Maps, and the coveted local 3-pack.',
    points: ['Profile creation & verification', 'Full local-SEO optimization', 'Maps listing & ranking', 'Review strategy that builds trust'],
    icon: 'M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    key: 'web',
    name: 'Website Development',
    label: 'Custom & high-converting',
    blurb:
      'A professional, lightning-fast, mobile-friendly website built to turn visitors into booked leads — SEO-ready from day one.',
    points: ['Custom mobile-first design', 'Local SEO built in', 'Lead-capture forms', 'Connected to your CRM'],
    icon: 'M3 5h18v14H3V5zm0 4h18M7 5v4',
    color: 'from-cyan-400 to-indigo-600',
  },
  {
    key: 'social',
    name: 'Social Media Management',
    label: 'Always-on presence',
    blurb:
      'We keep your brand active and consistent across platforms — content, scheduling, and engagement that compounds your reach.',
    points: ['Content creation & scheduling', 'Consistent on-brand posting', 'Community engagement', 'Growth-focused reporting'],
    icon: 'M18 8a3 3 0 1 0-2.8-4H15a3 3 0 0 0 .2 1.1L8.9 8.5a3 3 0 1 0 0 7l6.3 3.4A3 3 0 1 0 18 16a3 3 0 0 0-2.1.9L9.6 13.5a3 3 0 0 0 0-3L15.9 7A3 3 0 0 0 18 8z',
    color: 'from-fuchsia-400 to-violet-600',
  },
  {
    key: 'voice',
    name: 'Voice AI Caller',
    label: '24/7 AI receptionist',
    blurb:
      'An always-on AI that answers every call in milliseconds, qualifies leads, books appointments, and follows up by text — so nothing slips through.',
    points: ['Answers instantly, 24/7', 'Qualifies & books leads', 'Outbound follow-up calls', 'Automated SMS sequences'],
    icon: 'M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z',
    color: 'from-cyan-400 to-purple-600',
  },
]

const N = services.length
const ANGLE = 360 / N // 72°
const RADIUS = 300

/** One twisting rung of the background DNA strand. */
function Rung({ i, rotate, total }: { i: number; rotate: MotionValue<number>; total: number }) {
  const ry = useTransform(rotate, (r) => i * 30 + r)
  return (
    <motion.div
      className="absolute left-1/2 h-px w-40"
      style={{ top: `${(i / total) * 100}%`, rotateY: ry, transformStyle: 'preserve-3d', x: '-50%' }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/50 via-white/10 to-cyber-violet/50" />
      <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-cyan shadow-glow" />
      <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyber-violet shadow-glow-violet" />
    </motion.div>
  )
}

function DnaHelix({ rotate }: { rotate: MotionValue<number> }) {
  const rungs = Array.from({ length: 26 })
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center [perspective:900px]">
      <div className="relative h-[120vh] w-40" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(6deg)' }}>
        {rungs.map((_, i) => (
          <Rung key={i} i={i} rotate={rotate} total={rungs.length} />
        ))}
      </div>
    </div>
  )
}

/** A metric chip that orbits with the rotating ring. */
function OrbitChip({ angle, z, text }: { angle: number; z: number; text: string }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full glass-strong px-3 py-1.5 text-xs font-semibold text-white shadow-glow"
      style={{ transform: `translate(-50%,-50%) rotateY(${angle}deg) translateZ(${z}px)`, backfaceVisibility: 'hidden' }}
    >
      {text}
    </div>
  )
}

export default function ServicesHelix() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -(N - 1) * ANGLE])
  const helixRotate = useTransform(scrollYProgress, [0, 1], [0, 540])
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))))
  })

  const current = services[active]

  return (
    <section ref={ref} id="services" className="relative" style={{ height: `${N * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <DnaHelix rotate={helixRotate} />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-6 lg:grid-cols-2">
          {/* Active service details */}
          <div>
            <Eyebrow>What we do</Eyebrow>
            <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-white/40">
              {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl">
                  <span className="gradient-text">{current.name}</span>
                </h2>
                <p className="mt-1 text-sm uppercase tracking-widest text-cyber-cyan">{current.label}</p>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">{current.blurb}</p>
                <ul className="mt-6 grid max-w-md gap-2.5 sm:grid-cols-2">
                  {current.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-white/75">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-cyber-cyan" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* progress dots */}
            <div className="mt-8 flex gap-2">
              {services.map((s, i) => (
                <span
                  key={s.key}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? 'w-8 bg-gradient-to-r from-cyber-cyan to-cyber-violet' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Rotating 3D ring of service cards + orbiting chips */}
          <div className="relative hidden h-[460px] lg:block [perspective:1300px]">
            <motion.div className="absolute inset-0" style={{ rotateY, transformStyle: 'preserve-3d' }}>
              {services.map((s, i) => (
                <div
                  key={s.key}
                  className="absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`, backfaceVisibility: 'hidden' }}
                >
                  <div
                    className={`glow-border rounded-3xl glass-strong p-7 transition-shadow duration-500 ${
                      i === active ? 'shadow-glow-violet' : ''
                    }`}
                  >
                    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color}`}>
                      <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill={s.key === 'web' ? 'none' : 'currentColor'} stroke={s.key === 'web' ? 'currentColor' : 'none'} strokeWidth="2">
                        <path d={s.icon} />
                      </svg>
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-bold text-white">{s.name}</h3>
                    <p className="mt-1 text-sm uppercase tracking-widest text-cyber-cyan">{s.label}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/65">{s.blurb}</p>
                  </div>
                </div>
              ))}

              {/* orbiting metric chips */}
              <OrbitChip angle={36} z={340} text="+38% more booked" />
              <OrbitChip angle={150} z={320} text="0 missed leads" />
              <OrbitChip angle={252} z={330} text="24/7 coverage" />
              <OrbitChip angle={320} z={310} text="Done-for-you" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
