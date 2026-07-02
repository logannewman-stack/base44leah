import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Depth3D, Eyebrow } from './ui'
import { useIsMobile } from './useIsMobile'

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
  const isMobile = useIsMobile()
  const ref = useRef(null)
  // once:false so the count replays every time the card scrolls back into view
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const [val, setVal] = useState(from)

  useEffect(() => {
    // Mobile: show the final value instantly — no count-up animation.
    if (isMobile) {
      setVal(to)
      return
    }
    if (!inView) {
      setVal(from) // reset so it counts again next time
      return
    }
    const controls = animate(from, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, from, isMobile])

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
  { prefix: '', from: 1, to: 10400, decimals: 0, suffix: '+', label: 'Opportunities Tracked', sub: 'Leads & deals in your pipeline' },
  { prefix: '$', from: 0, to: 3.4, decimals: 1, suffix: 'M+', label: 'Pipeline Value Generated', sub: 'Created for our clients' },
  { prefix: '$', from: 42, to: 3.9, decimals: 2, suffix: '', label: 'Cost Per Lead', sub: 'Average — driven down across campaigns' },
  { prefix: '', from: 0, to: 24, decimals: 0, suffix: '/7', label: 'AI Availability', sub: 'Always answering, never closed' },
]

export default function Stats() {
  return (
    <section className="relative overflow-x-clip py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Depth3D className="mx-auto max-w-2xl text-center" power={0.7}>
          <div className="flex justify-center">
            <Eyebrow>By the numbers</Eyebrow>
          </div>
          <h2 className="mt-6 font-display text-[2.15rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem] lg:text-[3rem]">
            Results you can <span className="gradient-text">measure.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-neutral-500">
            Real outcomes from the campaigns, websites, and AI we run for service businesses like yours.
          </p>
        </Depth3D>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Depth3D key={s.label} className="h-full">
              <motion.div whileHover={{ y: -6 }} className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-black/[0.03] blur-2xl" />
                <p className="whitespace-nowrap font-display text-[2.7rem] font-bold leading-none tracking-[-0.03em] gradient-text">
                  <Counter to={s.to} from={s.from} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-5 font-semibold tracking-[-0.01em] text-neutral-900">{s.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{s.sub}</p>
              </motion.div>
            </Depth3D>
          ))}
        </div>
      </div>
    </section>
  )
}
