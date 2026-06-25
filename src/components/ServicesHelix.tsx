import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { Eyebrow } from './ui'

const services = [
  {
    key: 'wheels',
    name: 'Wheel & Tire Restoration',
    label: 'Rims, barrels & calipers',
    what: 'Wheels off, iron decontamination on. We deep-clean the face, barrel and lug seats, scrub the calipers, then dress and seal the tires to a deep satin black.',
    why: 'Clean, gleaming wheels are the single biggest thing people notice — they make the whole car read as freshly detailed.',
    icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    color: 'from-chrome-light to-chrome-mid',
  },
  {
    key: 'foam',
    name: 'Snow Foam Hand Wash',
    label: 'Two-bucket, scratch-free',
    what: 'A thick, clinging snow-foam pre-soak encapsulates grit so it rinses away before we ever touch the paint. Then a gentle two-bucket hand wash with plush mitts.',
    why: 'Most swirl marks come from careless washing. Our foam-first method protects your clear coat on every single visit.',
    icon: 'M7 10a5 5 0 0 1 9.6-2A4 4 0 1 1 18 16H8a4 4 0 0 1-1-7.9z',
    color: 'from-cyber-cyan to-cyber-blue',
  },
  {
    key: 'correction',
    name: 'Paint Correction',
    label: 'Swirl & scratch removal',
    what: 'Machine polishing that levels swirls, holograms and light scratches under calibrated lighting — restoring true depth, clarity and a wet, liquid gloss.',
    why: 'Correction transforms a dull, hazy finish into a mirror — the difference between "clean" and genuinely "showroom."',
    icon: 'M3 17l6-6 4 4 8-8M14 7h7v7',
    color: 'from-cyber-blue to-cyber-violet',
  },
  {
    key: 'ceramic',
    name: 'Ceramic Coating',
    label: 'Years of protection',
    what: 'A professional-grade ceramic layer chemically bonds to your paint for years of hydrophobic, UV-resistant protection and a glass-like, self-cleaning shine.',
    why: 'Lock in the finish: water beads and rolls off, dirt struggles to stick, and your paint stays protected season after season.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
    color: 'from-cyber-violet to-cyber-magenta',
  },
  {
    key: 'interior',
    name: 'Interior Deep Clean',
    label: 'Vacuum, steam & dress',
    what: 'Full carpet and upholstery extraction, steam-cleaned touch-points, leather conditioned, glass streak-free, and every surface dressed to a clean satin finish.',
    why: 'You spend your time inside the car — a fresh, sanitized, like-new cabin is the part of the detail you feel every day.',
    icon: 'M4 17v-5a4 4 0 0 1 4-4h3l3-3v15H8a4 4 0 0 1-4-3zm14-9h2v9h-2z',
    color: 'from-cyber-cyan to-cyber-violet',
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
      {/* strand A — cyan sphere */}
      <span
        className="absolute left-1/2 top-1/2 h-[15px] w-[15px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ecffff,#22d3ee_55%,#0b4a63)] shadow-[0_0_18px_5px_rgba(34,211,238,0.7)]"
        style={{ transform: `translate(-50%,-50%) translateX(${STRAND_R}px)` }}
      />
      {/* strand B — magenta sphere */}
      <span
        className="absolute left-1/2 top-1/2 h-[15px] w-[15px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe9fb,#e23bd2_55%,#5e1457)] shadow-[0_0_18px_5px_rgba(226,59,210,0.7)]"
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
  const stroke = service.key === 'correction'
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
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Five specialties. <span className="gradient-text">One flawless finish.</span>
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
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill={cur.key === 'correction' ? 'none' : 'currentColor'} stroke={cur.key === 'correction' ? 'currentColor' : 'none'} strokeWidth="2">
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
