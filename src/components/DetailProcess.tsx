import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { CoverVideo, Thumb } from './media'

/**
 * DetailProcess — a scroll-driven cinematic sequence.
 *
 * Each stage of the Sud Buds process fills the screen with REAL detailing
 * footage (rim cleaning → foam wash → paint correction → ceramic coating →
 * interior). As you scroll, the footage cross-fades stage to stage with depth —
 * the outgoing clip recedes and blurs while the next pushes forward — and the
 * copy floats on top. The video content is the visual; nothing to click.
 *
 * Clips stream from YouTube (cropped to cover, muted, looped). To swap a stage,
 * change its `id` / `start` (seconds) below.
 */

const STAGES = [
  {
    key: 'wheels',
    no: '01',
    tag: 'Wheels & rims',
    id: '9K6aH9Y7Zk0',
    start: 18,
    title: 'It starts at the wheels.',
    body: 'Iron remover, soft brushes and a barrel-deep scrub bring every face, spoke and caliper back to a mirror gleam before the body is ever touched.',
  },
  {
    key: 'foam',
    no: '02',
    tag: 'Foam wash',
    id: 'HqUEirOEyaw',
    start: 35,
    title: 'A clinging blanket of snow foam.',
    body: 'Thick pH-neutral foam encapsulates road grime and lifts it away, then a gentle two-bucket hand wash — so nothing is ever dragged across your clear coat.',
  },
  {
    key: 'correction',
    no: '03',
    tag: 'Paint correction',
    id: 'dukTLnRtHZU',
    start: 120,
    title: 'Swirls polished into glass.',
    body: 'Machine polishing under calibrated light levels every swirl, haze and hologram, restoring true depth and a wet, liquid gloss to the paint.',
  },
  {
    key: 'ceramic',
    no: '04',
    tag: 'Ceramic coating',
    id: 'mdzJHATaU0Q',
    start: 90,
    title: 'Sealed for years of shine.',
    body: 'A pro-grade ceramic layer bonds to the paint — hydrophobic, UV-resistant, self-cleaning protection that makes water bead and roll straight off.',
  },
  {
    key: 'interior',
    no: '05',
    tag: 'Interior detail',
    id: 'JwVZkKvb73s',
    start: 25,
    title: 'A cabin that feels brand new.',
    body: 'Deep extraction pulls dust and grit from every fiber, touch-points are steamed, and surfaces are dressed to a clean satin finish.',
  },
]

const N = STAGES.length

function Layer({ i, progress, stage, mounted }: { i: number; progress: MotionValue<number>; stage: (typeof STAGES)[number]; mounted: boolean }) {
  const opacity = useTransform(progress, (p) => {
    const d = Math.abs(i - p * (N - 1))
    return Math.max(0, Math.min(1, 1.55 - 2.3 * d))
  })
  const scale = useTransform(progress, (p) => {
    const d = Math.min(1.3, Math.abs(i - p * (N - 1)))
    return 1 + d * 0.16 // neighbours loom larger → depth
  })
  const filter = useTransform(progress, (p) => {
    const d = Math.min(1, Math.abs(i - p * (N - 1)))
    return `blur(${(d * 7).toFixed(1)}px)`
  })
  const zIndex = useTransform(progress, (p) => Math.round(10 - Math.abs(i - p * (N - 1)) * 10))

  return (
    <motion.div style={{ opacity, scale, filter, zIndex }} className="absolute inset-0 overflow-hidden will-change-transform">
      <Thumb id={stage.id} />
      {mounted && <CoverVideo id={stage.id} start={stage.start} title={`${stage.tag} — Sud Buds detailing`} />}
    </motion.div>
  )
}

/** Each stage's copy, faded in/out by scroll (no AnimatePresence — can't get
 *  stuck during fast scrolling). Only the active stage's copy is visible. */
function CopyLayer({ i, progress, stage }: { i: number; progress: MotionValue<number>; stage: (typeof STAGES)[number] }) {
  const opacity = useTransform(progress, (p) => {
    const d = Math.abs(i - p * (N - 1))
    return Math.max(0, Math.min(1, 1.5 - 3.4 * d))
  })
  const y = useTransform(progress, (p) => (i - p * (N - 1)) * 36)
  const zIndex = useTransform(progress, (p) => Math.round(40 - Math.abs(i - p * (N - 1)) * 10))
  return (
    <motion.div style={{ opacity, y, zIndex }} className="pointer-events-none absolute inset-x-0 bottom-[12vh] px-6 sm:left-10 sm:right-auto sm:px-0 lg:left-16">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          Step {stage.no} · {stage.tag}
        </span>
        <h3 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-tightest text-white drop-shadow-[0_3px_30px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl">
          {stage.title}
        </h3>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] sm:text-xl">
          {stage.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function DetailProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]))
  const ghostY = useTransform(scrollYProgress, [0, 1], [50, -50])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const s = p * (N - 1)
    setActive(Math.min(N - 1, Math.max(0, Math.round(s))))
    setMounted((prev) => {
      let next = prev
      STAGES.forEach((_, i) => {
        if (Math.abs(i - s) < 0.75 && !prev.has(i)) {
          if (next === prev) next = new Set(prev)
          next.add(i)
        }
      })
      return next
    })
  })

  return (
    <section ref={ref} id="process" className="relative" style={{ height: `${N * 120}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink-950">
        {/* stacked footage layers */}
        <div className="absolute inset-0">
          {STAGES.map((s, i) => (
            <Layer key={s.key} i={i} progress={scrollYProgress} stage={s} mounted={mounted.has(i)} />
          ))}
        </div>

        {/* cinematic grade + legibility */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-ink-950/55" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_220px_60px_rgba(0,0,0,0.7)]" />

        {/* giant ghost stage number */}
        <motion.span
          style={{ y: ghostY }}
          className="pointer-events-none absolute right-3 top-8 z-20 select-none font-display text-[30vw] font-extrabold leading-none text-white/[0.06] sm:text-[22vw] lg:right-10"
        >
          {STAGES[active].no}
        </motion.span>

        {/* section label */}
        <div className="absolute left-6 top-[10vh] z-30 sm:left-10 lg:left-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            The Sud Buds process
          </span>
        </div>

        {/* per-stage copy (scroll-driven, stacked) */}
        <div className="absolute inset-0 z-30">
          {STAGES.map((s, i) => (
            <CopyLayer key={s.key} i={i} progress={scrollYProgress} stage={s} />
          ))}
        </div>

        {/* progress rail */}
        <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 gap-2.5">
          {STAGES.map((s, i) => (
            <span key={s.key} className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? 'w-10 bg-brand-500' : 'w-4 bg-white/30'}`} />
          ))}
        </div>

        {/* scroll hint, only on first stage */}
        {active === 0 && (
          <div className="absolute bottom-7 right-6 z-30 hidden items-center gap-2 text-xs uppercase tracking-widest text-white/55 sm:flex lg:right-10">
            Scroll
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </div>
        )}
      </div>
    </section>
  )
}
