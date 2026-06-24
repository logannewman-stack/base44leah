import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './ui'

const services = [
  {
    key: 'meta',
    name: 'Meta Ads',
    label: 'Facebook & Instagram',
    blurb:
      'Fully managed paid campaigns on Facebook and Instagram — strategy, creative, and relentless optimization that puts your offer in front of the right people.',
    icon: 'M3 11l18-7-7 18-2.5-7.5L3 11z',
    color: 'from-sky-400 to-blue-600',
  },
  {
    key: 'gmb',
    name: 'Google My Business',
    label: 'Local visibility',
    blurb:
      'We create and fully optimize your Google Business Profile so you show up in local search, Google Maps, and the coveted local 3-pack.',
    icon: 'M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    key: 'web',
    name: 'Website Development',
    label: 'Custom & high-converting',
    blurb:
      'A professional, lightning-fast, mobile-friendly website built to turn visitors into booked leads — SEO-ready from day one.',
    icon: 'M3 5h18v14H3V5zm0 4h18M7 5v4',
    color: 'from-cyan-400 to-indigo-600',
  },
  {
    key: 'social',
    name: 'Social Media Management',
    label: 'Always-on presence',
    blurb:
      'We keep your brand active and consistent across platforms — content, scheduling, and engagement that compounds your reach.',
    icon: 'M18 8a3 3 0 1 0-2.8-4H15a3 3 0 0 0 .2 1.1L8.9 8.5a3 3 0 1 0 0 7l6.3 3.4A3 3 0 1 0 18 16a3 3 0 0 0-2.1.9L9.6 13.5a3 3 0 0 0 0-3L15.9 7A3 3 0 0 0 18 8z',
    color: 'from-fuchsia-400 to-violet-600',
  },
  {
    key: 'voice',
    name: 'Voice AI Caller',
    label: '24/7 AI receptionist',
    blurb:
      'An always-on AI that answers every call in milliseconds, qualifies leads, books appointments, and follows up by text — so nothing slips through.',
    icon: 'M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z',
    color: 'from-cyan-400 to-purple-600',
  },
]

const N = services.length
const R = 285 // orbit radius around the central DNA axis (px)
const STEP_ANGLE = 64 // degrees between consecutive services on the helix
const STEP_Y = 122 // vertical spacing between consecutive services (px)

/* ----------------------------- DNA double helix ---------------------------- */

function Rung({ i, total, rotate }: { i: number; total: number; rotate: MotionValue<number> }) {
  const ry = useTransform(rotate, (r) => i * 36 + r)
  const y = (i - (total - 1) / 2) * 27 // vertically centred strand
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-4 w-48"
      style={{ rotateY: ry, y, x: '-50%', transformStyle: 'preserve-3d' }}
    >
      <span className="absolute left-3 right-3 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-cyber-cyan/60 via-white/15 to-cyber-magenta/60" />
      <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_5px_rgba(34,211,238,0.8)]" />
      <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_16px_5px_rgba(226,59,210,0.8)]" />
    </motion.div>
  )
}

function DnaStrand({ rotate }: { rotate: MotionValue<number> }) {
  const rungs = Array.from({ length: 26 })
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {rungs.map((_, i) => (
        <Rung key={i} i={i} total={rungs.length} rotate={rotate} />
      ))}
    </div>
  )
}

/* --------------------------- Orbiting service card ------------------------- */

function Card({ service, i, progress }: { service: (typeof services)[number]; i: number; progress: MotionValue<number> }) {
  // d = 0 means this card is front-and-centre; d>0 is below/right (incoming),
  // d<0 is risen/left and swung around the back of the strand.
  const transform = useTransform(progress, (p) => {
    const d = i - p * (N - 1)
    const phi = d * STEP_ANGLE
    const rad = (phi * Math.PI) / 180
    const x = Math.sin(rad) * R
    const z = Math.cos(rad) * R
    const y = d * STEP_Y // incoming cards sit below, passed cards rise up
    const depth = (z / R + 1) / 2 // 0 back .. 1 front
    const scale = 0.72 + depth * 0.36
    return `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateY(${(-phi).toFixed(1)}deg) scale(${scale.toFixed(3)})`
  })
  const opacity = useTransform(progress, (p) => {
    const d = i - p * (N - 1)
    const depth = (Math.cos((d * STEP_ANGLE * Math.PI) / 180) + 1) / 2
    return 0.14 + depth * depth * 0.82 // transparent at the back, solid up front
  })

  const stroke = service.key === 'web' || service.key === 'social'
  return (
    <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 w-[280px]">
      <div className="glow-border rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md">
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color}`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill={stroke ? 'none' : 'currentColor'} stroke={stroke ? 'currentColor' : 'none'} strokeWidth="2">
            <path d={service.icon} />
          </svg>
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-white">{service.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-cyber-cyan">{service.label}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{service.blurb}</p>
      </div>
    </motion.div>
  )
}

function ProgressDot({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const w = useTransform(progress, (p) => (Math.abs(i - p * (N - 1)) < 0.5 ? 32 : 8))
  const o = useTransform(progress, (p) => (Math.abs(i - p * (N - 1)) < 0.5 ? 1 : 0.3))
  return <motion.span style={{ width: w, opacity: o }} className="h-1.5 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet" />
}

/* --------------------------------- Section -------------------------------- */

export default function ServicesHelix() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const helixRotate = useTransform(scrollYProgress, [0, 1], [0, 720])

  return (
    <section ref={ref} id="services" className="relative" style={{ height: `${N * 92}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden [perspective:1500px]">
        {/* heading */}
        <div className="absolute top-[11%] left-1/2 z-20 -translate-x-1/2 text-center">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Five services. <span className="gradient-text">One growth engine.</span>
          </h2>
        </div>

        {/* shared 3D stage: DNA axis + cards orbiting front-and-back around it */}
        <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', rotateX: 6 }}>
          <DnaStrand rotate={helixRotate} />
          {services.map((s, i) => (
            <Card key={s.key} service={s} i={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* progress dots */}
        <div className="absolute bottom-[9%] left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {services.map((s, i) => (
            <ProgressDot key={s.key} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
