import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

/**
 * Scroll-driven 3D depth: children fly up from deep in the scene, settle flat
 * when centred, then push forward toward the viewer as they leave — an immersive
 * "coming out of the screen" feel. Each instance is its own perspective scene.
 */
export function Depth3D({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const z = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [-460, 0, 30, 150])
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], [24, 0, -11])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.72])
  return (
    <div ref={ref} className={className} style={{ perspective: 1100 }}>
      <motion.div className="will-change-transform" style={{ z, rotateX, opacity, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}

/** Reveals children with a spring as they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** A button that subtly leans toward the cursor — the "alive" feel. */
export function MagneticButton({
  children,
  href = '#',
  variant = 'primary',
  className = '',
}: {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [t, setT] = useState({ x: 0, y: 0 })

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    setT({ x: x * 0.3, y: y * 0.3 })
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors'
  const styles =
    variant === 'primary'
      ? 'text-ink-900 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-violet shadow-glow hover:shadow-glow-violet'
      : 'text-white glass-strong hover:bg-white/10'

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      animate={{ x: t.x, y: t.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.3 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  )
}

/** Small pill label used above section headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
      <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow" />
      {children}
    </span>
  )
}
