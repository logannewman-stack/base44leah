import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './ui'

const features = [
  {
    title: 'We come to you',
    body: 'Fully mobile, every single time. We pull up to your home or office with our own water, power, and pro-grade gear — you never have to leave the driveway.',
    icon: 'M3 13l2-5h11l3 4h2v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-2z',
    color: 'from-sky-400 to-blue-600',
  },
  {
    title: 'Pro products, pro process',
    body: 'Dual-action polishers, pH-balanced foams, and certified ceramic coatings applied by trained detailers — the same caliber as a high-end shop, right at your curb.',
    icon: 'M12 3l1.8 4.6a3 3 0 0 0 1.8 1.8L20 11l-4.6 1.8a3 3 0 0 0-1.8 1.8L12 19l-1.8-4.6a3 3 0 0 0-1.8-1.8L4 11l4.6-1.6a3 3 0 0 0 1.8-1.8z',
    color: 'from-cyan-400 to-sky-600',
  },
  {
    title: 'Booked in 60 seconds',
    body: 'Pick your package, pick your time, and you are set. Upfront pricing, instant confirmation, and friendly reminders — no phone tag, no quotes to chase, no surprises.',
    icon: 'M13 2L3 14h7l-1 8 10-12h-7z',
    color: 'from-blue-400 to-indigo-600',
  },
  {
    title: 'Insured, vetted & guaranteed',
    body: 'Every detailer is background-checked, fully insured, and backed by our 100% satisfaction guarantee. If it is not perfect, we make it right — no questions asked.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
    color: 'from-sky-400 to-cyan-600',
  },
  {
    title: 'Protection that actually lasts',
    body: 'Our coatings and films are measured in years, not weeks. Your car keeps beading water and turning heads long after we pull out of the driveway.',
    icon: 'M12 3c3.2 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.8-6 6-10z',
    color: 'from-cyan-400 to-blue-600',
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
          <Eyebrow>Why Detail on Demand</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Detailing done right, <span className="gradient-text">brought to your door.</span>
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
