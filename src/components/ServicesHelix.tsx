import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { Eyebrow } from './ui'

const services = [
  {
    key: 'ceramic',
    name: 'Ceramic Coating',
    label: 'Liquid-glass protection',
    what: 'A professionally-applied 9H ceramic coating that bonds to your paint, locking in a deep gloss while repelling water, dirt, UV, and road grime for years — not weeks.',
    why: 'Your car stays glossier, cleaner, and far easier to wash, while the coating guards your paint against fading, etching, and everything the road throws at it.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
    color: 'from-blue-400 to-indigo-600',
  },
  {
    key: 'correction',
    name: 'Paint Correction',
    label: 'Swirls & scratches erased',
    what: 'A multi-stage machine polish that removes swirl marks, scratches, water spots, and oxidation — restoring the true depth, clarity, and mirror finish hiding under your paint.',
    why: 'Erase years of wear in a single visit so your car looks better than the day you drove it home — the perfect foundation before any coating goes on.',
    icon: 'M12 3l1.8 4.6a3 3 0 0 0 1.8 1.8L20 11l-4.6 1.8a3 3 0 0 0-1.8 1.8L12 19l-1.8-4.6a3 3 0 0 0-1.8-1.8L4 11l4.6-1.6a3 3 0 0 0 1.8-1.8z',
    color: 'from-cyan-400 to-sky-600',
  },
  {
    key: 'ppf',
    name: 'Paint Protection Film',
    label: 'Invisible armor',
    what: 'A self-healing, optically-clear urethane film applied to high-impact areas — bumper, hood, mirrors, and beyond — that shields against rock chips, scuffs, and stains.',
    why: 'Take the hits the road throws at you without a single chip in your paint, protecting both your finish and your resale value for the long haul.',
    icon: 'M12 2 5 5v6c0 5 3 9 7 11 4-2 7-6 7-11V5l-7-3z',
    color: 'from-sky-400 to-blue-600',
  },
  {
    key: 'interior',
    name: 'Interior Detailing',
    label: 'Like-new cabin',
    what: 'A full interior deep clean — steam, shampoo, and extraction of carpets and seats, leather cleaned and conditioned, every vent, crevice, and surface restored and sanitized.',
    why: 'Step into a fresh, spotless, germ-free cabin that smells and feels brand new — the part of your car you actually live in, finally treated like it.',
    icon: 'M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3a2 2 0 0 1 1 2v5h-3v-2H6v2H3v-5a2 2 0 0 1 1-2z',
    color: 'from-cyan-400 to-indigo-600',
  },
  {
    key: 'mobile',
    name: 'Mobile Wash & Maintenance',
    label: 'Showroom-ready, at your door',
    what: 'Recurring, fully-mobile detailing on your schedule — exterior hand wash, decontamination, wheels, tires, and an interior refresh, all performed right in your driveway.',
    why: 'Keep that just-detailed look all year without ever leaving home — we bring the water, the power, and the pro products straight to you.',
    icon: 'M3 13l2-5h11l3 4h2v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-2z',
    color: 'from-blue-400 to-sky-600',
  },
]

const N = services.length
const R = 235 // orbit radius around the central DNA axis (px)
const STEP_ANGLE = 64 // degrees between consecutive services
const STEP_Y = 132 // vertical spacing between consecutive services (px)

/* ----------------------- DNA: dense living double helix -------------------- */

const STRAND_R = 104 // half-distance between the two strands (px)

function StrandLevel({ k, total, rotate }: { k: number; total: number; rotate: MotionValue<number> }) {
  const ry = useTransform(rotate, (r) => k * 30 + r)
  const y = (k - (total - 1) / 2) * 18.5
  const rung = k % 2 === 0
  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ rotateY: ry, y, transformStyle: 'preserve-3d' }}>
      {rung && (
        <span
          className="absolute left-1/2 top-1/2 h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyber-cyan/45 via-white/15 to-cyber-magenta/45"
          style={{ transform: 'translate(-50%,-50%)', width: STRAND_R * 2 }}
        />
      )}
      {/* strand A — ice-blue sphere */}
      <span
        className="absolute left-1/2 top-1/2 h-[15px] w-[15px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ecffff,#38bdf8_55%,#0b4a63)] shadow-[0_0_18px_5px_rgba(56,189,248,0.7)]"
        style={{ transform: `translate(-50%,-50%) translateX(${STRAND_R}px)` }}
      />
      {/* strand B — electric-blue sphere */}
      <span
        className="absolute left-1/2 top-1/2 h-[15px] w-[15px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#dbeafe,#2563eb_55%,#11215e)] shadow-[0_0_18px_5px_rgba(37,99,235,0.7)]"
        style={{ transform: `translate(-50%,-50%) translateX(-${STRAND_R}px)` }}
      />
    </motion.div>
  )
}

function DnaStrand({ rotate }: { rotate: MotionValue<number> }) {
  const levels = Array.from({ length: 52 })
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {/* soft glowing core so the spine reads as solid */}
      <div className="absolute left-1/2 top-1/2 h-[86vh] w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-white/15 to-transparent blur-[4px]" />
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
    const scale = 0.66 + depth * 0.5
    return `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateY(${phi.toFixed(1)}deg) scale(${scale.toFixed(3)})`
  })
  const opacity = useTransform(progress, (p) => {
    const d = i - p * (N - 1)
    const depth = (Math.cos((d * STEP_ANGLE * Math.PI) / 180) + 1) / 2
    return 0.14 + depth * depth * 0.86
  })
  const stroke = service.key === 'interior'
  return (
    <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 w-[300px]">
      <div className="glow-border rounded-[1.75rem] border border-white/10 bg-white/[0.07] px-8 py-9 text-center backdrop-blur-md">
        <span className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color}`}>
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-white" fill={stroke ? 'none' : 'currentColor'} stroke={stroke ? 'currentColor' : 'none'} strokeWidth="2">
            <path d={service.icon} />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-[1.7rem] font-bold leading-tight text-white">{service.name}</h3>
        <p className="mt-2.5 text-[0.8rem] uppercase tracking-[0.2em] text-cyber-cyan">{service.label}</p>
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
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden [perspective:1000px]">
        {/* heading */}
        <div className="absolute top-[8%] left-1/2 z-20 -translate-x-1/2 text-center">
          <Eyebrow>Our services</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Five services. <span className="gradient-text">One flawless finish.</span>
          </h2>
        </div>

        {/* LEFT — what it does */}
        <div className="absolute left-5 top-1/2 z-20 hidden w-[384px] -translate-y-1/2 md:block lg:left-10 xl:left-16">
          <div className="glow-border rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyber-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow" />
              <p className="text-sm font-semibold uppercase tracking-[0.28em]">What it does</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.key}
                initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -14, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mt-6 flex items-center gap-3">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cur.color}`}>
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill={cur.key === 'interior' ? 'none' : 'currentColor'} stroke={cur.key === 'interior' ? 'currentColor' : 'none'} strokeWidth="2">
                      <path d={cur.icon} />
                    </svg>
                  </span>
                  <h3 className="font-display text-[1.7rem] font-bold leading-tight text-white">{cur.name}</h3>
                </div>
                <p className="mt-5 text-base leading-relaxed text-white/70">{cur.what}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — why it matters */}
        <div className="absolute right-5 top-1/2 z-20 hidden w-[384px] -translate-y-1/2 md:block lg:right-10 xl:right-16">
          <div className="glow-border rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-8 text-right backdrop-blur-md">
            <div className="flex items-center justify-end gap-2 text-cyber-magenta">
              <p className="text-sm font-semibold uppercase tracking-[0.28em]">Why it matters</p>
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
                <p className="mt-6 font-display text-[1.7rem] font-bold leading-tight text-white">{cur.name}</p>
                <p className="mt-5 text-base leading-relaxed text-white/75">{cur.why}</p>
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
