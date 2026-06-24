import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from './ui'

function Counter({ to, suffix = '', prefix = '', decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const stats = [
  { to: 100, suffix: '%', label: 'Calls answered', sub: 'Every call, day or night' },
  { to: 0.2, suffix: 's', decimals: 1, label: 'Average pickup', sub: 'Faster than any human' },
  { to: 38, suffix: '%', label: 'More booked jobs', sub: 'From captured leads' },
  { to: 24, suffix: '/7', label: 'Always on', sub: 'No sick days, no holidays' },
]

export default function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass relative overflow-hidden rounded-2xl p-6"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyber-cyan/10 blur-2xl" />
                <p className="font-display text-4xl font-bold gradient-text sm:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-2 font-semibold text-white">{s.label}</p>
                <p className="text-sm text-white/50">{s.sub}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
