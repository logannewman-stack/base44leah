import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Suspense, lazy, useRef, useState } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

/**
 * DetailProcess — the cinematic centerpiece.
 *
 * A single full-bleed WebGL plane renders four procedural "video" scenes that
 * tell the detail story: spinning chrome WHEELS, a snow-FOAM bath, a streak-free
 * DRY-DOWN with water beading, and a deep interior VACUUM. Scroll blends between
 * them with a soapy diagonal wipe transition, while copy floats on top.
 *
 * Everything is generated on the GPU — no video files to buffer or break — so it
 * stays razor-sharp at any resolution and loads instantly.
 */

const DetailProcessCanvas = lazy(() => import('./DetailProcessCanvas'))

const STAGES = [
  {
    key: 'wheels',
    no: '01',
    tag: 'Wheels & rims',
    title: 'Faces, barrels & calipers — restored.',
    body:
      'Wheels come off the dirt first. We hit the face, the barrel, the lug seats and the brake calipers with pH-balanced iron remover and soft detail brushes until every spoke throws light like the day it left the showroom.',
    specs: ['Iron decontamination', 'Barrel-deep cleaning', 'Tire dressed & sealed'],
    accent: 'from-chrome-light to-chrome-mid',
  },
  {
    key: 'foam',
    no: '02',
    tag: 'Foam bath',
    title: 'A thick snow-foam blanket lifts the grime.',
    body:
      'A clinging layer of pH-neutral snow foam encapsulates road film and grit, then rinses free — so nothing is ever dragged across your clear coat. Two-bucket hand wash, plush wash mitts, scratch-free every time.',
    specs: ['pH-neutral snow foam', 'Two-bucket hand wash', 'Grit-guard rinse'],
    accent: 'from-cyber-cyan to-cyber-blue',
  },
  {
    key: 'dry',
    no: '03',
    tag: 'Streak-free dry',
    title: 'Beaded, sheeted and dried to glass.',
    body:
      'Filtered water beads up and sheets off a freshly-sealed surface. We follow with plush microfiber and warm forced air into every shut-line and emblem — zero water spots, zero swirls, just a mirror finish.',
    specs: ['Spot-free filtered rinse', 'Forced-air dry', 'Sealant & gloss boost'],
    accent: 'from-cyber-blue to-cyber-violet',
  },
  {
    key: 'vacuum',
    no: '04',
    tag: 'Interior detail',
    title: 'Every fiber vacuumed, every surface revived.',
    body:
      'Inside, we extract the dust, sand and pet hair buried deep in the carpet and seats, steam the touch-points, and dress every surface to a clean satin finish. You step into a cabin that smells and feels brand new.',
    specs: ['Deep carpet extraction', 'Steam-cleaned touch-points', 'UV-safe surface dressing'],
    accent: 'from-cyber-violet to-cyber-magenta',
  },
]

const N = STAGES.length

/* CSS fallback (no WebGL / while the canvas streams in) — a tinted gradient per
   stage so the copy always reads, and the section never looks broken. */
function SceneFallback({ progress }: { progress: MotionValue<number> }) {
  const tints = ['#11202b', '#0c2a3f', '#141a3a', '#241338']
  const [idx, setIdx] = useState(0)
  useMotionValueEvent(progress, 'change', (v) => setIdx(Math.min(N - 1, Math.round(v * (N - 1)))))
  return (
    <div
      className="absolute inset-0 transition-[background] duration-700"
      style={{ background: `radial-gradient(120% 90% at 50% 30%, ${tints[idx]}, #04070b 75%)` }}
    />
  )
}

function StageCopy({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -22, filter: 'blur(10px)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-xl"
    >
      <span className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyber-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow" />
        Step {stage.no} · {stage.tag}
      </span>
      <h3 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
        {stage.title}
      </h3>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">{stage.body}</p>
      <ul className="mt-7 flex flex-wrap gap-2.5">
        {stage.specs.map((s) => (
          <li key={s} className={`rounded-full bg-gradient-to-r ${stage.accent} p-px`}>
            <span className="flex items-center gap-2 rounded-full bg-ink-900/80 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-cyber-cyan" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {s}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function DetailProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))))
  })
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} id="process" className="relative" style={{ height: `${N * 115}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* WebGL "video" layer (lazy) over a CSS gradient fallback */}
        <div className="absolute inset-0">
          <SceneFallback progress={scrollYProgress} />
          <ErrorBoundary>
            <Suspense fallback={null}>
              <DetailProcessCanvas progress={scrollYProgress} />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* legibility scrims */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/25 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/55" />

        {/* giant ghost stage number */}
        <motion.span
          style={{ y: ghostY }}
          className="pointer-events-none absolute right-2 top-10 select-none font-display text-[28vw] font-bold leading-none text-white/[0.04] sm:text-[22vw] lg:right-10"
        >
          {STAGES[active].no}
        </motion.span>

        {/* section eyebrow */}
        <div className="absolute left-6 top-[12vh] z-10 sm:left-10 lg:left-16">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow" />
            The Sud Buds process
          </span>
          <h2 className="mt-3 max-w-md font-display text-2xl font-bold text-white/90 sm:text-3xl">
            Four obsessive stages. <span className="gradient-text">One flawless finish.</span>
          </h2>
        </div>

        {/* per-stage copy */}
        <div className="absolute inset-x-0 bottom-[12vh] z-10 px-6 sm:left-10 sm:right-auto sm:px-0 lg:left-16">
          <AnimatePresence mode="wait">
            <StageCopy key={STAGES[active].key} stage={STAGES[active]} />
          </AnimatePresence>
        </div>

        {/* stage rail */}
        <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
          {STAGES.map((s, i) => (
            <button
              key={s.key}
              onClick={() => {
                const el = ref.current
                if (!el) return
                const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * (i / (N - 1))
                window.scrollTo({ top, behavior: 'smooth' })
              }}
              className="group flex items-center gap-3"
              aria-label={`Go to ${s.tag}`}
            >
              <span className={`text-right font-display text-xs font-semibold uppercase tracking-widest transition-colors ${active === i ? 'text-white' : 'text-white/35 group-hover:text-white/60'}`}>
                {s.tag}
              </span>
              <span className={`h-2.5 w-2.5 rounded-full transition-all ${active === i ? 'bg-gradient-to-br from-cyber-cyan to-cyber-violet shadow-glow' : 'bg-white/20 group-hover:bg-white/40'}`} />
            </button>
          ))}
        </div>

        {/* progress dashes */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {STAGES.map((s, i) => (
            <span key={s.key} className={`h-1 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-gradient-to-r from-cyber-cyan to-cyber-violet' : 'w-3 bg-white/25'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
