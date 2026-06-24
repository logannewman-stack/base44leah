import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './ui'

// 50 unique, futuristic statements — each card appears exactly once.
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
  'Data that drives every decision',
  'Creative that stops the thumb',
  'Local search domination',
  'Booked calendars on autopilot',
  'Ads engineered to convert',
  'Brand presence that commands attention',
  'Lightning-fast, mobile-first sites',
  'Lead response in milliseconds',
  'Campaigns tuned in real time',
  'Storytelling that sells',
  'Ruthlessly optimized ad spend',
  'Reviews that build trust',
  'Funnels that never leak',
  'Content engines that compound',
  'The local 3-pack, conquered',
  'Every click accounted for',
  'Voice AI that closes',
  'Designed to outperform',
  'Growth on demand',
  'Always testing, always winning',
  'Magnetic landing pages',
  'Outrank, outshine, outsell',
  'Automation that feels human',
  'Built for scale from day one',
  'Precision audience targeting',
  'Insights you can act on',
  'Momentum that compounds',
  'Your unfair advantage',
  'Sales pipelines that flow',
  'Retargeting that reconverts',
  'Bold visuals, sharp strategy',
  'Up and to the right',
  'Customer journeys, perfected',
  'Speed, scale, and substance',
  'Marketing that pays for itself',
  'Relentlessly on-brand',
  'Engineered for the algorithm',
  'Results you can feel',
]

const COUNT = statements.length
const SP = 250 // z-distance between consecutive cards in the tunnel (px)
const FRONT = 70 // pushes cards slightly past the camera so they magnify as they pass
const PERSP = 520 // lower = more dramatic warp
const AHEAD = 6 // how many cards ahead are visible (fading in from the depths)
const SPIN = 30 // degrees of swirl per depth-step — cards curve around the centre as they fly in

const clamp = (v: number) => Math.max(0, Math.min(1, v))
const wrap = (v: number) => ((v % 1) + 1) % 1

/** A statement card flying out of the depths toward the viewer, exactly once. */
function WarpCard({ text, i, progress }: { text: string; i: number; progress: MotionValue<number> }) {
  const baseAngle = i * 137.5 // degrees — golden-angle spread fills the whole screen
  const RR = 60 + (i % 6) * 120 // varied radius: some centre, some out to the edges

  const transform = useTransform(progress, (p) => {
    const d = i - p * (COUNT - 1) // d>0 ahead, 0 at camera, <0 passed
    // angle swirls with depth, so each card curves around the centre as it approaches
    const ang = (baseAngle + d * SPIN) * (Math.PI / 180)
    const x = Math.cos(ang) * RR
    const y = Math.sin(ang) * RR
    const z = -d * SP + FRONT
    // bank the card a little so it leans into the curve
    const bank = -(d * SPIN) * 0.35
    return `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateZ(${bank.toFixed(1)}deg)`
  })
  const opacity = useTransform(progress, (p) => {
    const d = i - p * (COUNT - 1)
    if (d > AHEAD || d < -0.85) return 0
    if (d > 1) return clamp((AHEAD - d) / (AHEAD - 1)) // fade in from far
    if (d < 0) return clamp((d + 0.85) / 0.85) // fade out as it sweeps past
    return 1
  })

  return (
    <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 w-[min(86vw,460px)]">
      <div className="glass-strong rounded-3xl px-8 py-7 text-center">
        <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-neutral-900/80" />
        <p className="font-display text-2xl font-bold leading-snug text-neutral-900 sm:text-3xl">{text}</p>
      </div>
    </motion.div>
  )
}

/** Concentric frames flying toward you — the tunnel walls wrapping around. */
const RING_COUNT = 18
const RING_DEPTH = 1500
const RING_LOOPS = 8
function Ring({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const baseT = i / RING_COUNT
  const transform = useTransform(progress, (p) => `translate(-50%,-50%) translateZ(${(-wrap(baseT - p * RING_LOOPS) * RING_DEPTH + FRONT).toFixed(1)}px)`)
  const opacity = useTransform(progress, (p) => Math.max(0, Math.min(0.5, Math.sin(wrap(baseT - p * RING_LOOPS) * Math.PI) * 0.8)))
  return <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 h-[60vmin] w-[88vmin] rounded-[2.5rem] border-2 border-neutral-900/20" />
}

export default function WarpTunnel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const twist = useTransform(scrollYProgress, [0, 1], [0, 90])
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.12])

  const rings = Array.from({ length: RING_COUNT })

  return (
    <section ref={ref} className="relative" style={{ height: `${COUNT * 11}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden" style={{ perspective: `${PERSP}px` }}>
        {/* heading — flat & crisp above the tunnel */}
        <motion.div style={{ scale: titleScale }} className="absolute top-[8%] left-1/2 z-20 -translate-x-1/2 px-6 text-center">
          <Eyebrow>Why we're different</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Work that <span className="gradient-text">breaks the mold.</span>
          </h2>
        </motion.div>

        {/* the tunnel */}
        <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', rotateZ: twist }}>
          {rings.map((_, i) => (
            <Ring key={i} i={i} progress={scrollYProgress} />
          ))}
          {statements.map((t, i) => (
            <WarpCard key={t} text={t} i={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* vanishing-point wash */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_22%,_rgba(246,246,247,0.5)_85%)]" />
      </div>
    </section>
  )
}
