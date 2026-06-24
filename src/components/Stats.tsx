import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Depth3D, Eyebrow } from './ui'

function Counter({
  to,
  from = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  to: number
  from?: number
  suffix?: string
  prefix?: string
  decimals?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(from)

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, from])

  const formatted = val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

// `from` higher than `to` makes the number count DOWN (e.g. lowering cost per lead).
const stats = [
  { prefix: '', from: 0, to: 10400, decimals: 0, suffix: '+', label: 'Opportunities Tracked', sub: 'Leads & deals in your pipeline' },
  { prefix: '$', from: 0, to: 3.4, decimals: 1, suffix: 'M+', label: 'Pipeline Value Generated', sub: 'Created for our clients' },
  { prefix: '$', from: 42, to: 3.9, decimals: 2, suffix: ' avg', label: 'Cost Per Lead', sub: 'Driven down across campaigns' },
  { prefix: '', from: 0, to: 24, decimals: 0, suffix: '/7', label: 'AI Availability', sub: 'Always answering, never closed' },
]

export default function Stats() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Depth3D className="mx-auto max-w-2xl text-center" power={0.7}>
          <div className="flex justify-center">
            <Eyebrow>By the numbers</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Results you can <span className="gradient-text">measure.</span>
          </h2>
          <p className="mt-5 text-neutral-500">
            Real outcomes from the campaigns, websites, and AI we run for service businesses like yours.
          </p>
        </Depth3D>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Depth3D key={s.label}>
              <motion.div whileHover={{ y: -6 }} className="glass relative h-full overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-black/[0.03] blur-2xl" />
                <p className="font-display text-4xl font-bold gradient-text sm:text-5xl">
                  <Counter to={s.to} from={s.from} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-2 font-semibold text-neutral-900">{s.label}</p>
                <p className="text-sm text-neutral-500">{s.sub}</p>
              </motion.div>
            </Depth3D>
          ))}
        </div>
      </div>
    </section>
  )
}
