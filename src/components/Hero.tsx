import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MagneticButton } from './ui'

/* A glossy, spinning chrome wheel rendered entirely in CSS — the hero's
   centerpiece. Conic gradients fake the brushed-metal lip, spokes and hub. */
function ChromeWheel() {
  return (
    <div className="relative h-[19rem] w-[19rem] sm:h-[23rem] sm:w-[23rem]">
      {/* wet halo */}
      <div className="absolute inset-0 -z-10 animate-float rounded-full bg-gradient-to-br from-cyber-cyan/25 to-cyber-violet/25 blur-3xl" />

      {/* tire */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#0a0d12_60%,#1a1f26_72%,#05070a_82%,#000_100%)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]" />

      {/* spinning rim assembly */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[9%] rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #e9f2fb, #6f8294, #cfdded, #50616f, #f4f9ff, #6f8294, #c3d3e2, #46566a, #e9f2fb)',
          boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.5), inset 0 0 40px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.6)',
        }}
      >
        {/* spokes — five chrome blades via repeating cones masked into a ring */}
        <div
          className="absolute inset-[12%] rounded-full"
          style={{
            background:
              'repeating-conic-gradient(from 0deg, #cddcea 0deg 14deg, #3f4f5e 14deg 22deg, #eef5fc 22deg 36deg, #566472 36deg 40deg, #2c3a48 40deg 72deg)',
            WebkitMask: 'radial-gradient(circle, transparent 22%, #000 24%, #000 92%, transparent 94%)',
            mask: 'radial-gradient(circle, transparent 22%, #000 24%, #000 92%, transparent 94%)',
          }}
        />
        {/* brake disc behind */}
        <div className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle,#1c2128,#0c1015)] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />
        {/* center hub cap */}
        <div className="absolute inset-[40%] rounded-full bg-[radial-gradient(circle_at_38%_32%,#ffffff,#aab9c8_45%,#3d4d5c)] shadow-[0_2px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.8)]" />
      </motion.div>

      {/* static specular gleam sweeping the rim (doesn't spin) */}
      <div className="sheen-sweep pointer-events-none absolute inset-[9%] rounded-full" />

      {/* a few water beads clinging to the rim */}
      {[
        { t: '14%', l: '30%', s: 10 },
        { t: '62%', l: '20%', s: 7 },
        { t: '30%', l: '74%', s: 8 },
        { t: '72%', l: '66%', s: 6 },
      ].map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#bfe0f5_45%,#5b8fb0)] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          style={{ top: b.t, left: b.l, height: b.s, width: b.s }}
        />
      ))}
    </div>
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

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yCard = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  // subtle parallax tilt of the wheel toward the cursor
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 16 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 16 })
  useEffect(() => {
    const h = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', h)
    return () => window.removeEventListener('pointermove', h)
  }, [mx, my])

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center pt-28 pb-12">
      <div className="absolute inset-0 grid-overlay" />
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-32 top-24 h-[28rem] w-[28rem] rounded-full bg-cyber-cyan/25 blur-[120px]"
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
            Mobile detailing · We come to you
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.7rem]">
            <motion.span className="block chrome-text" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}>
              Showroom shine.
            </motion.span>
            <motion.span className="block gradient-text drop-shadow-[0_0_30px_rgba(52,224,232,0.4)]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.8 }}>
              Every single time.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.8 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/70"
          >
            Sud Buds Detailing brings the full studio to your driveway — rim &amp; wheel
            restoration, a clinging snow-foam hand wash, a streak-free dry-down, and a
            deep interior detail that makes your car feel brand new again.
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
            <MagneticButton href="#process" variant="ghost">
              See the process
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/50"
          >
            <span>★★★★★ <span className="text-white/70">5.0</span></span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>600+ cars detailed</span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>Fully insured &amp; mobile</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yCard }} className="relative flex justify-center [perspective:1200px] lg:justify-end">
          <motion.div style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}>
            <ChromeWheel />
          </motion.div>
          <FloatChip className="-left-2 top-4 sm:-left-8" delay={1} value="Wheels" label="Restored" icon="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          <FloatChip className="-right-2 top-1/3 sm:-right-6" delay={1.3} value="Snow foam" label="Hand wash" icon="M7 10a5 5 0 0 1 9.6-2A4 4 0 1 1 18 16H8a4 4 0 0 1-1-7.9z" />
          <FloatChip className="bottom-2 -left-1 sm:-left-6" delay={1.6} value="Interior" label="Deep clean" icon="M4 17v-5a4 4 0 0 1 4-4h3l3-3v15H8a4 4 0 0 1-4-3zm14-9h2v9h-2z" />
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
