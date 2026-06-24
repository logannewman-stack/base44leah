import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './ui'

const features = [
  {
    title: 'One team, every channel',
    body: 'Ads, Google presence, website, social, and AI call handling — all run by one team that actually talks to each other, so nothing falls through the cracks.',
    icon: 'M4 5h16v4H4V5zm0 6h16v4H4v-4zm0 6h10v2H4v-2z',
    color: 'from-zinc-700 to-zinc-900',
  },
  {
    title: 'Fully managed, done for you',
    body: 'We handle the strategy, the build, and the ongoing optimization. You just show up to the booked appointments.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
    color: 'from-zinc-700 to-zinc-900',
  },
  {
    title: 'Every lead captured',
    body: 'Your ads, your site, and your AI receptionist all feed one pipeline — no missed calls, no lost leads, no leaks.',
    icon: 'M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3 0-8 1.5-8 4.5V20h9v-2.5c0-1.2.5-2.3 1.3-3.2A13 13 0 0 0 8 13zm8 0a13 13 0 0 0-2.3.2A5.6 5.6 0 0 1 15 17.5V20h9v-2.5c0-3-5-4.5-8-4.5z',
    color: 'from-zinc-700 to-zinc-900',
  },
  {
    title: 'Built to win local',
    body: 'Local SEO, Google Maps, and the 3-pack — we make you the obvious, trusted choice in your area.',
    icon: 'M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z',
    color: 'from-zinc-700 to-zinc-900',
  },
  {
    title: 'Real results, tracked',
    body: 'Live dashboards and clear reporting show exactly where your leads and revenue come from — no guesswork.',
    icon: 'M4 13h3v7H4v-7zm6.5-5h3v12h-3V8zM17 3h3v17h-3V3z',
    color: 'from-zinc-700 to-zinc-900',
  },
]

const M = features.length
const STEP = 56 // degrees around the horizontal (X) axis between cards
const RY = 240 // vertical radius of the roll
const RZ = 350 // depth radius
const Y_OFFSET = 34 // nudge the whole wheel down to clear the heading

/** A benefit card riding a vertical 3D wheel — rolls up over the top and back,
 *  and in from the bottom front, as you scroll. */
function RollCard({ f, i, progress }: { f: (typeof features)[number]; i: number; progress: MotionValue<number> }) {
  const transform = useTransform(progress, (p) => {
    const d = i - p * (M - 1)
    const th = d * STEP
    const r = (th * Math.PI) / 180
    const y = Math.sin(r) * RY + Y_OFFSET // d>0 below (incoming), d<0 above (rolled away)
    const z = Math.cos(r) * RZ // front-centre when focused, back at top/under
    const depth = (z / RZ + 1) / 2
    const scale = 0.66 + depth * 0.42
    return `translate(-50%,-50%) translate3d(0px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateX(${(-th).toFixed(1)}deg) scale(${scale.toFixed(3)})`
  })
  const opacity = useTransform(progress, (p) => {
    const d = Math.abs(i - p * (M - 1))
    return Math.max(0.04, 1 - d * 0.82) // focused card dominates, neighbours fade fast
  })
  return (
    <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 w-[min(90vw,460px)]">
      <div className="glow-border rounded-[2rem] border border-black/10 bg-white/80 p-8 backdrop-blur-md shadow-glow-violet">
        <span className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color}`}>
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
            <path d={f.icon} />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-neutral-900">{f.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-neutral-600">{f.body}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section ref={ref} id="why" className="relative" style={{ height: `${M * 75}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden [perspective:1100px]">
        <div className="absolute top-[5%] left-1/2 z-20 -translate-x-1/2 px-6 text-center">
          <Eyebrow>Why Front Desk AI</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Your entire growth team, <span className="gradient-text">under one roof.</span>
          </h2>
        </div>

        <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {features.map((f, i) => (
            <RollCard key={f.title} f={f} i={i} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
