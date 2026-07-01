import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './ui'
import { useIsMobile } from './useIsMobile'

const cards = [
  {
    title: 'Industry-leading ad campaigns, engineered to convert.',
    body: 'Full-funnel campaigns built to turn clicks into booked jobs — not just impressions.',
  },
  {
    title: 'Creatives that break the scroll.',
    body: 'Ad creative designed to stop thumbs and start conversations. While competitors blend in, you stand out.',
  },
  {
    title: 'The lowest cost per lead in your market.',
    body: 'AI-driven targeting and optimization drive your cost per lead down and your booked revenue up.',
  },
  {
    title: 'Your AI receptionist never sleeps.',
    body: 'Every call answered, every lead captured, every appointment booked — 24/7.',
  },
  {
    title: 'Own the map on Google.',
    body: 'We optimize your Google Business Profile so you rank higher, get found first, and turn local searches into customers.',
  },
  {
    title: 'Social media that actually sells.',
    body: 'Consistent, scroll-stopping content that builds your brand and fills your pipeline — posted and managed for you.',
  },
  {
    title: 'One platform. Every lead. Zero leaks.',
    body: 'Ads, GMB, social, CRM, and your AI receptionist working as one system so no opportunity slips through.',
  },
]

const N = cards.length

/* ------------------------------ Cover-flow card ---------------------------- */

function FlowCard({ card, i, progress, isMobile }: { card: (typeof cards)[number]; i: number; progress: MotionValue<number>; isMobile: boolean }) {
  const FRONT = isMobile ? 152 : 300 // gap from centre to the first neighbour
  const BACK = isMobile ? 40 : 64 // far neighbours bunch up behind the first
  const TILT = 48 // max rotateY of the side cards (degrees)
  const DEPTH = isMobile ? 70 : 110 // how far each step recedes in Z

  const transform = useTransform(progress, (p) => {
    const d = i - p * (N - 1) // 0 = focused, >0 to the right, <0 to the left
    const ad = Math.abs(d)
    const sign = d < 0 ? -1 : 1
    // step out clearly for the first neighbour, then bunch the rest at the sides
    const x = sign * (Math.min(ad, 1) * FRONT + Math.max(ad - 1, 0) * BACK)
    // side cards open toward the centre like a cover-flow; clamp so it saturates
    const ry = -Math.max(-1, Math.min(1, d)) * TILT
    // recede with distance; the focused card pops slightly toward the viewer
    const z = -Math.min(ad, 3) * DEPTH + (ad < 0.5 ? 60 : 0)
    const scale = Math.max(0.74, 1 - ad * 0.12)
    return `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,0px,${z.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) scale(${scale.toFixed(3)})`
  })
  const opacity = useTransform(progress, (p) => {
    const ad = Math.abs(i - p * (N - 1))
    if (ad > 3.2) return 0
    return Math.max(0.12, 1 - ad * 0.26)
  })

  return (
    <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 w-[min(86vw,380px)] sm:w-[440px]">
      <div className="glow-border rounded-[1.75rem] border border-black/[0.06] bg-white/85 p-8 backdrop-blur-md shadow-glow-violet sm:p-9">
        <span className="inline-flex h-1.5 w-10 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-magenta" />
        <h3 className="mt-6 font-display text-2xl font-bold leading-[1.12] tracking-[-0.03em] text-neutral-900 sm:text-[1.7rem]">{card.title}</h3>
        <p className="mt-3.5 text-[1.02rem] leading-relaxed text-neutral-500 sm:text-lg">{card.body}</p>
      </div>
    </motion.div>
  )
}

function ProgressDot({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const w = useTransform(progress, (p) => (Math.abs(i - p * (N - 1)) < 0.5 ? 28 : 8))
  const o = useTransform(progress, (p) => (Math.abs(i - p * (N - 1)) < 0.5 ? 1 : 0.3))
  return <motion.span style={{ width: w, opacity: o }} className="h-1.5 rounded-full bg-neutral-900" />
}

const Heading = () => (
  <>
    <Eyebrow>Why we're different</Eyebrow>
    <h2 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]">
      Built to make you the <span className="gradient-text">obvious choice.</span>
    </h2>
  </>
)

/* --------------- Reduced-motion: clean static stacked column --------------- */

function CoverFlowStatic() {
  return (
    <section className="relative overflow-x-clip py-20">
      <div className="mx-auto max-w-lg px-6">
        <div className="text-center">
          <Heading />
        </div>
        <div className="mt-10 space-y-4">
          {cards.map((c) => (
            <div key={c.title} className="glow-border rounded-[1.75rem] border border-black/[0.06] bg-white/85 p-6">
              <span className="inline-flex h-1.5 w-10 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-magenta" />
              <h3 className="mt-4 font-display text-xl font-bold leading-tight text-neutral-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Section --------------------------------- */

export default function CoverFlow() {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  if (reduceMotion) return <CoverFlowStatic />

  return (
    <section ref={ref} className="relative overflow-x-clip" style={{ height: `${N * 58}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden [perspective:1500px]">
        <div className="absolute top-[9%] left-1/2 z-30 -translate-x-1/2 px-6 text-center">
          <Heading />
        </div>

        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {cards.map((c, i) => (
            <FlowCard key={c.title} card={c} i={i} progress={scrollYProgress} isMobile={isMobile} />
          ))}
        </div>

        <div className="absolute bottom-[7%] left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {cards.map((c, i) => (
            <ProgressDot key={c.title} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
