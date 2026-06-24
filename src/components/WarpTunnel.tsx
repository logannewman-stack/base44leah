import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './ui'

const statements = [
  'Industry-breaking ad campaigns',
  'One-of-a-kind visuals',
  'Unmatched Google Business optimization',
  'Websites that bend reality',
  'Scroll-stopping social content',
  'AI that never sleeps',
  'Conversion-engineered funnels',
  'Built to dominate your market',
  'Pixel-perfect, performance-first',
  'Future-proof growth systems',
  'Relentless, always-on lead capture',
  'Obsessed with your results',
]

const COUNT = statements.length
const DEPTH = 1500 // length of the tunnel (px)
const NEAR = 260 // how far past the camera a card travels before recycling
const LOOPS = 1.5 // how many full passes across the section's scroll
const PERSP = 620 // perspective: lower = more dramatic warp

const wrap = (v: number) => ((v % 1) + 1) % 1

/** A statement card flying out of the depths toward the viewer. */
function WarpCard({ text, i, progress }: { text: string; i: number; progress: MotionValue<number> }) {
  const baseT = i / COUNT
  const angle = i * 137.5 * (Math.PI / 180) // golden-angle spread around the tunnel
  const RR = 210 + (i % 4) * 70 // varied radius from the centre axis

  const transform = useTransform(progress, (p) => {
    const phase = wrap(baseT - p * LOOPS) // 0 = right at the camera, 1 = far away
    const x = Math.cos(angle) * RR
    const y = Math.sin(angle) * RR
    const z = -phase * DEPTH + NEAR
    return `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px)`
  })
  const opacity = useTransform(progress, (p) => {
    const phase = wrap(baseT - p * LOOPS)
    return Math.max(0, Math.min(1, Math.sin(phase * Math.PI) * 1.35)) // fade in far, peak mid, fade as it passes
  })

  return (
    <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 w-[260px]">
      <div className="glass-strong rounded-2xl px-5 py-4 text-center">
        <span className="mx-auto mb-2 block h-1 w-8 rounded-full bg-neutral-900/80" />
        <p className="font-display text-lg font-bold leading-snug text-neutral-900">{text}</p>
      </div>
    </motion.div>
  )
}

/** Concentric frames that fly toward you — the tunnel walls wrapping around. */
const RING_COUNT = 16
function Ring({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const baseT = i / RING_COUNT
  const transform = useTransform(progress, (p) => {
    const phase = wrap(baseT - p * LOOPS)
    return `translate(-50%,-50%) translateZ(${(-phase * DEPTH + NEAR).toFixed(1)}px)`
  })
  const opacity = useTransform(progress, (p) => Math.max(0, Math.min(0.55, Math.sin(wrap(baseT - p * LOOPS) * Math.PI) * 0.8)))
  return <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 h-[56vmin] w-[80vmin] rounded-[2.5rem] border-2 border-neutral-900/20" />
}

export default function WarpTunnel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const twist = useTransform(scrollYProgress, [0, 1], [0, 28]) // gentle warp rotation
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1])

  const rings = Array.from({ length: RING_COUNT })

  return (
    <section ref={ref} className="relative" style={{ height: '320vh' }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden" style={{ perspective: `${PERSP}px` }}>
        {/* heading (flat & crisp, above the tunnel) */}
        <motion.div style={{ scale: titleScale }} className="absolute top-[9%] left-1/2 z-20 -translate-x-1/2 px-6 text-center">
          <Eyebrow>Why we're different</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Work that <span className="gradient-text">breaks the mold.</span>
          </h2>
        </motion.div>

        {/* the tunnel: rings + flying statement cards */}
        <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', rotateZ: twist }}>
          {rings.map((_, i) => (
            <Ring key={i} i={i} progress={scrollYProgress} />
          ))}
          {statements.map((t, i) => (
            <WarpCard key={t} text={t} i={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* vanishing-point wash so the tunnel recedes into the page colour */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_28%,_rgba(246,246,247,0.55)_82%)]" />
      </div>
    </section>
  )
}
