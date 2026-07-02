import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { contactModal } from './useContactModal'
import { useIsMobile } from './useIsMobile'

/**
 * Scroll-driven 3D depth: children rush up from deep in the scene, settle crisp
 * when centred, then fly forward OUT of the screen toward the viewer as they
 * leave. Dramatic, immersive pop. Each instance is its own perspective scene.
 * `power` scales how far things travel (1 = strong, 1.4 = very aggressive).
 */
export function Depth3D({
  children,
  className = '',
  power = 1,
}: {
  children: ReactNode
  className?: string
  power?: number
}) {
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  // Mobile / reduced-motion: flat & static — no scroll listener, no 3D transform.
  if (isMobile || reduceMotion) return <div className={className}>{children}</div>
  return (
    <Depth3DMotion className={className} power={power}>
      {children}
    </Depth3DMotion>
  )
}

function Depth3DMotion({ children, className, power }: { children: ReactNode; className: string; power: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const z = useTransform(scrollYProgress, [0, 0.4, 0.66, 1], [-560 * power, 0, 0, 220 * power])
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.66, 1], [30, 0, 0, -18])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.9, 1], [0, 1, 1, 0.45])
  return (
    <div ref={ref} className={className} style={{ perspective: 1300 }}>
      <motion.div className="h-full" style={{ z, rotateX, opacity, transformStyle: 'preserve-3d' }}>
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
  const isMobile = useIsMobile()
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

  // Any CTA pointing at "#contact" opens the contact modal instead of jumping.
  const onClick = (e: MouseEvent) => {
    if (href === '#contact') {
      e.preventDefault()
      contactModal.open()
    }
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-[0.005em] transition-all duration-200'
  const styles =
    variant === 'primary'
      ? 'text-white bg-neutral-900 shadow-glow hover:bg-black hover:shadow-glow-violet'
      : 'text-neutral-900 border border-black/[0.09] bg-white/80 shadow-soft hover:bg-white hover:border-black/[0.14]'

  // Mobile: plain anchor — no cursor-follow spring, no Framer on the touch path.
  if (isMobile) {
    return (
      <a href={href} onClick={onClick} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
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
    <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-neutral-500 shadow-soft backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue shadow-[0_0_0_3px_rgba(79,124,255,0.14)]" />
      {children}
    </span>
  )
}
