import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MagneticButton } from './ui'

// Services shown ticking through the "booking" card — each a line icon.
const lineItems = [
  { name: 'Exterior hand wash & decon', icon: 'M12 3c3.2 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.8-6 6-10z', tone: 'from-sky-400 to-blue-600' },
  { name: 'Multi-stage paint correction', icon: 'M12 3l1.6 4.1a3 3 0 0 0 1.7 1.7L19.4 10l-4.1 1.6a3 3 0 0 0-1.7 1.7L12 17l-1.6-4.1a3 3 0 0 0-1.7-1.7L4.6 10l4.1-1.6a3 3 0 0 0 1.7-1.7z', tone: 'from-cyan-400 to-sky-600' },
  { name: 'Ceramic coating · 9H', icon: 'M12 3 5 6v5c0 4.3 3 8.4 7 9.5 4-1.1 7-5.2 7-9.5V6l-7-3z', tone: 'from-blue-400 to-indigo-600' },
  { name: 'Interior deep clean & steam', icon: 'M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M4 11h16v6H4zM7 17v2M17 17v2', tone: 'from-sky-400 to-cyan-600' },
  { name: 'Wheels, tires & glass', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', tone: 'from-cyan-400 to-blue-600' },
]

/** A glassy "booking card" showing the mobile detail on its way to you. */
function BookingCard() {
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
          <p className="text-xs uppercase tracking-widest text-cyber-cyan">Mobile detail</p>
          <p className="text-sm font-semibold text-white">Booked · Saturday 10:00 AM</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> On the way
        </span>
      </div>

      <div className="mt-5 space-y-2.5">
        {lineItems.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.12 }}
            className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${c.tone}`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={c.icon} />
              </svg>
            </span>
            <span className="flex-1 text-sm font-medium text-white/85">{c.name}</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-xl bg-white/5 py-2.5">
          <p className="text-sm font-bold gradient-text">60 sec</p>
          <p className="text-[10px] uppercase tracking-wider text-white/50">To book</p>
        </div>
        <div className="rounded-xl bg-white/5 py-2.5">
          <p className="text-sm font-bold gradient-text">5.0★</p>
          <p className="text-[10px] uppercase tracking-wider text-white/50">Last 200 jobs</p>
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
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-cyan/30 to-cyber-blue/30 text-cyber-cyan">
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
            Mobile detailing · Ceramic coatings
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.7rem]">
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}>
              Showroom shine,
            </motion.span>
            <motion.span className="block gradient-text drop-shadow-[0_0_30px_rgba(56,189,248,0.45)]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.8 }}>
              on demand.
            </motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              We come to you.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.8 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/70"
          >
            Premium mobile detailing, ceramic coatings, and paint correction — booked in
            60&nbsp;seconds and delivered right to your driveway. No drop-offs, no waiting rooms,
            just a flawless, protected finish that turns heads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.74, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#contact">
              Book my detail
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#packages" variant="ghost">
              View packages &amp; pricing
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
            <span>2,000+ cars detailed</span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>Fully insured &amp; mobile</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yCard }} className="relative flex justify-center [perspective:1200px] lg:justify-end">
          <div className="pointer-events-none absolute inset-0 -z-10 animate-float rounded-full bg-gradient-to-br from-cyber-cyan/15 to-cyber-violet/20 blur-3xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 [mask-image:linear-gradient(transparent,#000,transparent)]"
          />
          <BookingCard />
          <FloatChip className="-left-4 top-6 sm:-left-10" delay={1} value="9H ceramic" label="Years of protection" icon="M12 3 5 6v5c0 4.3 3 8.4 7 9.5 4-1.1 7-5.2 7-9.5V6l-7-3z" />
          <FloatChip className="-right-2 top-1/3 sm:-right-6" delay={1.3} value="We come to you" label="Driveway or office" icon="M3 13l2-5h11l3 4h2v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-2z" />
          <FloatChip className="bottom-4 -left-2 sm:-left-8" delay={1.6} value="500+ reviews" label="4.9★ average" icon="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
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
