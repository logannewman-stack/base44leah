import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton } from './ui'

function Waveform() {
  const bars = Array.from({ length: 28 })
  return (
    <div className="flex h-12 items-center gap-1">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-cyber-cyan to-cyber-violet"
          animate={{ height: ['18%', '95%', '38%', '70%', '20%'] }}
          transition={{
            duration: 1.1 + (i % 5) * 0.18,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: i * 0.04,
          }}
          style={{ height: '30%' }}
        />
      ))}
    </div>
  )
}

/** A small glowing metric pill that floats around the call card. */
function FloatChip({
  className,
  delay,
  label,
  value,
  icon,
}: {
  className: string
  delay: number
  label: string
  value: string
  icon: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6 },
        y: { duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`absolute z-20 flex items-center gap-2.5 rounded-2xl glass-strong px-3.5 py-2.5 shadow-glow ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-cyan/30 to-cyber-violet/30 text-cyber-cyan">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d={icon} />
        </svg>
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-white">{value}</p>
        <p className="text-[10px] uppercase tracking-wider text-white/50">{label}</p>
      </div>
    </motion.div>
  )
}

function CallCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: 18 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="glow-border relative w-full max-w-sm rounded-3xl glass-strong p-6 shadow-glow-violet"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-cyber-cyan/15">
            <span className="absolute inset-0 animate-pulseRing rounded-full border border-cyber-cyan/50" />
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyber-cyan" fill="currentColor">
              <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
            </svg>
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-cyber-cyan">Live call</p>
            <p className="text-sm font-semibold text-white">Incoming · New lead</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
          AI answering
        </span>
      </div>

      <div className="mt-6 rounded-2xl bg-black/30 p-4">
        <Waveform />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex gap-2">
          <span className="text-cyber-violet">Caller</span>
          <p className="text-white/70">“Hi, do you have anything open this Friday?”</p>
        </div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="text-cyber-cyan">AI</span>
          <p className="text-white">“Absolutely — I have 2:30pm Friday. Shall I book it for you?”</p>
        </motion.div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        {[
          ['0.2s', 'Pickup'],
          ['100%', 'Answered'],
          ['Booked', 'Outcome'],
        ].map(([v, k]) => (
          <div key={k} className="rounded-xl bg-white/5 py-2.5">
            <p className="text-sm font-bold gradient-text">{v}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50">{k}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yCard = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center pt-28 pb-12">
      <div className="absolute inset-0 grid-overlay" />
      {/* Aurora glow blobs to remove dead space and add neon depth */}
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-32 top-24 h-[28rem] w-[28rem] rounded-full bg-cyber-blue/25 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute right-0 bottom-10 h-[32rem] w-[32rem] rounded-full bg-cyber-violet/25 blur-[130px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ y: yText, opacity, scale }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyber-cyan"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow" />
            Front Desk AI
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.7rem]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              The future of
            </motion.span>
            <motion.span
              className="block gradient-text drop-shadow-[0_0_30px_rgba(99,102,241,0.45)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.8 }}
            >
              sales management
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              at your fingertips.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.8 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/70"
          >
            Front Desk AI answers every call in milliseconds, qualifies and captures every
            lead, and books the deal — an always-on AI sales force that turns your phone into
            your best closer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.74, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#pricing">
              Start free trial
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#how" variant="ghost">
              See how it works
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/50"
          >
            <span>★★★★★ <span className="text-white/70">4.9/5</span></span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>Trusted by 1,200+ businesses</span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Live now
            </span>
          </motion.div>
        </motion.div>

        {/* Right composition: call card + floating neon metric chips */}
        <motion.div style={{ y: yCard }} className="relative flex justify-center lg:justify-end">
          <div className="pointer-events-none absolute inset-0 -z-10 animate-float rounded-full bg-gradient-to-br from-cyber-cyan/15 to-cyber-violet/20 blur-3xl" />
          {/* rotating accent ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 [mask-image:linear-gradient(transparent,#000,transparent)]"
          />
          <CallCard />
          <FloatChip
            className="-left-4 top-6 sm:-left-10"
            delay={1}
            value="+38%"
            label="More booked"
            icon="M3 17l6-6 4 4 8-8M21 7v6h-6"
          />
          <FloatChip
            className="-right-2 top-1/3 sm:-right-6"
            delay={1.3}
            value="24/7"
            label="Always on"
            icon="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          />
          <FloatChip
            className="bottom-4 -left-2 sm:-left-8"
            delay={1.6}
            value="0 missed"
            label="Calls"
            icon="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest"
        >
          Scroll
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
