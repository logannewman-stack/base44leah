import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './ui'

const features = [
  {
    title: 'We come to you',
    body: 'Fully mobile — we bring our own water, power and pro-grade gear to your home or office. You never have to leave the driveway.',
    icon: 'M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5v5h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3v-5zm2 0h14l-1.3-3.3a1 1 0 0 0-.9-.7H7.2a1 1 0 0 0-.9.7L5 13z',
    color: 'from-cyber-cyan to-cyber-blue',
  },
  {
    title: 'Swirl-free, every time',
    body: 'Foam-first pre-soak, two-bucket method, grit guards and plush microfiber. We protect your clear coat like it is our own.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
    color: 'from-cyber-blue to-cyber-violet',
  },
  {
    title: 'Pro products & coatings',
    body: 'pH-balanced soaps, dedicated iron removers, and certified ceramic coatings — the same products the best studios trust.',
    icon: 'M9 2h6v3l2 4v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-4V2zm0 9h6',
    color: 'from-cyber-cyan to-cyber-violet',
  },
  {
    title: 'Obsessive attention',
    body: 'Shut-lines, emblems, vents, lug seats and stitching — we sweat the details most washes skip, because the details are the job.',
    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
    color: 'from-cyber-violet to-cyber-magenta',
  },
  {
    title: 'Satisfaction guaranteed',
    body: 'If something is not right, we make it right — no questions asked. Fully insured, and backed by hundreds of 5-star reviews.',
    icon: 'M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 14.9 7.2 16.4l.9-5.3L4.3 7.4l5.3-.8L12 2z',
    color: 'from-chrome-light to-chrome-mid',
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
    <motion.div style={{ transform, opacity }} className="absolute left-1/2 top-1/2 w-[min(92vw,540px)]">
      <div className="glow-border rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 backdrop-blur-md shadow-glow-violet">
        <span className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color}`}>
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-white" fill="currentColor">
            <path d={f.icon} />
          </svg>
        </span>
        <h3 className="mt-7 font-display text-4xl font-bold leading-tight text-white">{f.title}</h3>
        <p className="mt-4 text-xl leading-relaxed text-white/70">{f.body}</p>
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
          <Eyebrow>Why Sud Buds</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Detailing done right, <span className="gradient-text">in your driveway.</span>
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
