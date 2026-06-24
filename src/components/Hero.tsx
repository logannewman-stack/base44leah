import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MagneticButton } from './ui'

const channels = [
  { name: 'Meta Ads', icon: 'M3 11l18-7-7 18-2.5-7.5L3 11z', tone: 'from-zinc-700 to-zinc-900' },
  { name: 'Google My Business', icon: 'M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z', tone: 'from-zinc-700 to-zinc-900' },
  { name: 'Website', icon: 'M3 5h18v14H3V5zm0 4h18', tone: 'from-zinc-700 to-zinc-900' },
  { name: 'Social Media', icon: 'M18 8a3 3 0 1 0-2.8-4 3 3 0 0 0 .2 1.1L8.9 8.5a3 3 0 1 0 0 7l6.3 3.4A3 3 0 1 0 18 16a3 3 0 0 0-2.1.9', tone: 'from-zinc-700 to-zinc-900' },
  { name: 'Voice AI Caller', icon: 'M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z', tone: 'from-zinc-700 to-zinc-900' },
]

/** A glassy "command center" showing every channel the agency runs for you. */
function CommandCard() {
  // live mouse-driven 3D tilt so the hero reads as dimensional immediately
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 16 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 16 })
  useEffect(() => {
    const h = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', h)
    return () => window.removeEventListener('pointermove', h)
  }, [mx, my])
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="glow-border relative w-full max-w-sm rounded-3xl glass-strong p-6 shadow-glow-violet"
      style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyber-cyan">Growth engine</p>
          <p className="text-sm font-semibold text-neutral-900">All channels · Live</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-black/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-800" /> Running
        </span>
      </div>

      <div className="mt-5 space-y-2.5">
        {channels.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.12 }}
            className="flex items-center gap-3 rounded-xl bg-black/[0.04] px-3 py-2.5"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${c.tone}`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill={c.name === 'Website' || c.name === 'Social Media' ? 'none' : 'currentColor'} stroke={c.name === 'Website' || c.name === 'Social Media' ? 'currentColor' : 'none'} strokeWidth="2">
                <path d={c.icon} />
              </svg>
            </span>
            <span className="flex-1 text-sm font-medium text-neutral-800">{c.name}</span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-600">Active</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-xl bg-black/[0.04] py-2.5">
          <p className="text-sm font-bold gradient-text">+38%</p>
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">More booked</p>
        </div>
        <div className="rounded-xl bg-black/[0.04] py-2.5">
          <p className="text-sm font-bold gradient-text">0</p>
          <p className="text-[10px] uppercase tracking-wider text-neutral-500">Leads missed</p>
        </div>
      </div>
    </motion.div>
  )
}

function FloatChip({ className, delay, label, value, icon }: { className: string; delay: number; label: string; value: string; icon: string }) {
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
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.06] text-neutral-700">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d={icon} />
        </svg>
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-neutral-900">{value}</p>
        <p className="text-[10px] uppercase tracking-wider text-neutral-500">{label}</p>
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
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-32 top-24 h-[28rem] w-[28rem] rounded-full bg-black/[0.03] blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute right-0 bottom-10 h-[32rem] w-[32rem] rounded-full bg-black/[0.03] blur-[130px]"
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
            Front Desk AI · Growth agency
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.7rem]">
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}>
              The future of
            </motion.span>
            <motion.span className="block gradient-text drop-shadow-[0_0_30px_rgba(99,102,241,0.45)]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.8 }}>
              sales management
            </motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              at your fingertips.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.8 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600"
          >
            We run your Meta &amp; Google ads, build and optimize your Google Business profile,
            design your website, manage your social media, and answer every call with AI — one
            fully-managed growth team for your entire front desk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.74, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#contact">
              Speak with a representative
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#services" variant="ghost">
              Explore our services
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-500"
          >
            <span>★★★★★ <span className="text-neutral-600">4.9/5</span></span>
            <span className="hidden h-4 w-px bg-black/[0.06] sm:block" />
            <span>Trusted by 1,200+ businesses</span>
            <span className="hidden h-4 w-px bg-black/[0.06] sm:block" />
            <span>Fully managed, done for you</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yCard }} className="relative flex justify-center [perspective:1200px] lg:justify-end">
          <div className="pointer-events-none absolute inset-0 -z-10 animate-float rounded-full bg-gradient-to-br from-cyber-cyan/15 to-cyber-violet/20 blur-3xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.06] [mask-image:linear-gradient(transparent,#000,transparent)]"
          />
          <CommandCard />
          <FloatChip className="-left-4 top-6 sm:-left-10" delay={1} value="+38%" label="More booked" icon="M3 17l6-6 4 4 8-8M21 7v6h-6" />
          <FloatChip className="-right-2 top-1/3 sm:-right-6" delay={1.3} value="5 channels" label="One team" icon="M4 5h16v4H4V5zm0 6h16v4H4v-4zm0 6h10v2H4v-2z" />
          <FloatChip className="bottom-4 -left-2 sm:-left-8" delay={1.6} value="0 missed" label="Leads" icon="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-400"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest">
          Scroll
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
