import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { Eyebrow } from './ui'

const services = [
  {
    key: 'meta',
    name: 'Meta Ads',
    label: 'Facebook & Instagram',
    what: 'We run fully-managed paid campaigns on Facebook and Instagram — strategy, creative, audience targeting, and relentless optimization that puts your offer in front of the right people.',
    why: 'Turn ad spend into booked jobs by reaching ready-to-buy customers in your area — every lead funnelled straight into your pipeline.',
    icon: 'M3 11l18-7-7 18-2.5-7.5L3 11z',
    color: 'from-sky-400 to-blue-600',
  },
  {
    key: 'gmb',
    name: 'Google My Business',
    label: 'Local visibility',
    what: 'We create and fully optimize your Google Business Profile — photos, services, local-SEO keywords, and reviews — so you rank in local search and Google Maps.',
    why: 'Own the map and the local 3-pack so you are the first business people find, trust, and call when they search.',
    icon: 'M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    key: 'web',
    name: 'Website Development',
    label: 'Custom & high-converting',
    what: 'A professional, lightning-fast, mobile-friendly website built to convert — local SEO baked in, lead-capture forms, and a direct line into your CRM.',
    why: 'A fast, trustworthy site that works around the clock, turning curious visitors into booked leads while you sleep.',
    icon: 'M3 5h18v14H3V5zm0 4h18M7 5v4',
    color: 'from-cyan-400 to-indigo-600',
  },
  {
    key: 'social',
    name: 'Social Media Management',
    label: 'Always-on presence',
    what: 'We keep your brand active and consistent across platforms — content creation, scheduling, posting, and community engagement that compounds your reach.',
    why: 'Stay top-of-mind and build the social proof that makes choosing you the obvious, easy decision.',
    icon: 'M18 8a3 3 0 1 0-2.8-4H15a3 3 0 0 0 .2 1.1L8.9 8.5a3 3 0 1 0 0 7l6.3 3.4A3 3 0 1 0 18 16a3 3 0 0 0-2.1.9L9.6 13.5a3 3 0 0 0 0-3L15.9 7A3 3 0 0 0 18 8z',
    color: 'from-fuchsia-400 to-violet-600',
  },
  {
    key: 'voice',
    name: 'Voice AI Caller',
    label: '24/7 AI receptionist',
    what: 'An always-on AI that answers every call in milliseconds, qualifies leads, books appointments, makes outbound follow-ups, and replies to texts automatically.',
    why: 'Never miss a call or a lead again — every enquiry answered and booked, day or night, even while you work.',
    icon: 'M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z',
    color: 'from-cyan-400 to-purple-600',
  },
]

const N = services.length
const R = 250 // orbit radius around the central DNA axis (px)
const STEP_ANGLE = 64 // degrees between consecutive services
const STEP_Y = 120 // vertical spacing between consecutive services (px)

/* ----------------------- DNA: dense living double helix -------------------- */

function StrandLevel({ k, total, rotate }: { k: number; total: number; rotate: MotionValue<number> }) {
  const ry = useTransform(rotate, (r) => k * 30 + r)
  const y = (k - (total - 1) / 2) * 16.5
  const rung = k % 2 === 0
  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ rotateY: ry, y, transformStyle: 'preserve-3d' }}>
      {rung && (
        <span
          className="absolute left-1/2 top-1/2 h-[2px] w-[150px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyber-cyan/45 via-white/15 to-cyber-magenta/45"
          style={{ transform: 'translate(-50%,-50%)' }}
        />
      )}
      {/* strand A — cyan sphere */}
      <span
        className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ecffff,#22d3ee_55%,#0b4a63)] shadow-[0_0_14px_4px_rgba(34,211,238,0.65)]"
        style={{ transform: 'translate(-50%,-50%) translateX(74px)' }}
      />
      {/* strand B — magenta sphere */}
      <span
        className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe9fb,#e23bd2_55%,#5e1457)] shadow-[0_0_14px_4px_rgba(226,59,210,0.65)]"
        style={{ transform: 'translate(-50%,-50%) translateX(-74px)' }}
      />
    </motion.div>
  )
}

function DnaStrand({ rotate }: { rotate: MotionValue<number> }) {
  const levels = Array.from({ length: 46 })
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {/* soft glowing core so the spine reads as solid */}
      <div className="absolute left-1/2 top-1/2 h-[78vh] w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-white/15 to-transparent blur-[3px]" />
      {levels.map((_, k) => (
        <StrandLevel key={k} k={k} total={levels.length} rotate={rotate} />
      ))}
    </div>
  )
}

/* --------------------------- Orbiting service tile ------------------------- */

function Tile({ service, i, progress }: { service: (typeof services)[number]; i: number; progress: MotionValue<number> }) {
  // faces point radially OUTWARD (rotateY = phi) so they never flip toward the axis
  const transform = useTransform(progress, (p) => {
    const d = i - p * (N - 1)
    const phi = d * STEP_ANGLE
    const rad = (phi * Math.PI) / 180
    const x = Math.sin(rad) * R
    const z = Math.cos(rad) * R
    const y = d * STEP_Y
    const depth = (z / R + 1) / 2
    const scale = 0.7 + depth * 0.4
    return `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateY(${phi.toFixed(1)}deg) scale(${scale.toFixed(3)})`
  })
  const opacity = useTransform(progress, (p) => {
    const d = i - p * (N - 1)
    const depth = (Math.cos((d * STEP_ANGLE * Math.PI) / 180) + 1) / 2
    return 0.16 + depth * depth * 0.84
  })
  const stroke = service.key === 'web' || service.key === 'social'
  return (
    <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 w-[200px]">
      <div className="glow-border rounded-3xl border border-white/10 bg-white/[0.07] px-5 py-6 text-center backdrop-blur-md">
        <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color}`}>
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill={stroke ? 'none' : 'currentColor'} stroke={stroke ? 'currentColor' : 'none'} strokeWidth="2">
            <path d={service.icon} />
          </svg>
        </span>
        <h3 className="mt-4 font-display text-lg font-bold leading-tight text-white">{service.name}</h3>
        <p className="mt-1 text-[11px] uppercase tracking-widest text-cyber-cyan">{service.label}</p>
      </div>
    </motion.div>
  )
}

function ProgressDot({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const w = useTransform(progress, (p) => (Math.abs(i - p * (N - 1)) < 0.5 ? 30 : 8))
  const o = useTransform(progress, (p) => (Math.abs(i - p * (N - 1)) < 0.5 ? 1 : 0.3))
  return <motion.span style={{ width: w, opacity: o }} className="h-1.5 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet" />
}

/* --------------------------------- Section -------------------------------- */

export default function ServicesHelix() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const helixRotate = useTransform(scrollYProgress, [0, 1], [0, 720])
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.round(p * (N - 1)))))
  })
  const cur = services[active]

  return (
    <section ref={ref} id="services" className="relative" style={{ height: `${N * 92}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden [perspective:1500px]">
        {/* heading */}
        <div className="absolute top-[8%] left-1/2 z-20 -translate-x-1/2 text-center">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Five services. <span className="gradient-text">One growth engine.</span>
          </h2>
        </div>

        {/* LEFT — what it does */}
        <div className="absolute left-5 top-1/2 z-20 hidden w-[330px] -translate-y-1/2 md:block lg:left-12">
          <div className="glow-border rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyber-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em]">What it does</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.key}
                initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -14, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mt-5 flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cur.color}`}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill={cur.key === 'web' || cur.key === 'social' ? 'none' : 'currentColor'} stroke={cur.key === 'web' || cur.key === 'social' ? 'currentColor' : 'none'} strokeWidth="2">
                      <path d={cur.icon} />
                    </svg>
                  </span>
                  <h3 className="font-display text-2xl font-bold leading-tight text-white">{cur.name}</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">{cur.what}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — why it matters */}
        <div className="absolute right-5 top-1/2 z-20 hidden w-[330px] -translate-y-1/2 md:block lg:right-12">
          <div className="glow-border rounded-3xl border border-white/10 bg-white/[0.05] p-7 text-right backdrop-blur-md">
            <div className="flex items-center justify-end gap-2 text-cyber-magenta">
              <p className="text-xs font-semibold uppercase tracking-[0.28em]">Why it matters</p>
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-magenta shadow-glow-violet" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.key}
                initial={{ opacity: 0, x: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 14, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-5 font-display text-xl font-semibold leading-snug text-white">{cur.name}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/75">{cur.why}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* shared 3D stage: DNA axis + tiles orbiting around it */}
        <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', rotateX: 6 }}>
          <DnaStrand rotate={helixRotate} />
          {services.map((s, i) => (
            <Tile key={s.key} service={s} i={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* progress dots */}
        <div className="absolute bottom-[7%] left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {services.map((s, i) => (
            <ProgressDot key={s.key} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
