import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { bookingModal } from './useContactModal'

/**
 * Image that drifts slightly slower than the scroll for depth. The <img> is
 * over-scaled and translated within an overflow-hidden frame so edges never
 * show. Give the wrapping frame a fixed aspect via className.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  strength = 60,
  eager = false,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  strength?: number
  eager?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        style={{ y, height: `calc(100% + ${strength * 2}px)`, top: -strength }}
        className={`absolute left-0 w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}

/** Reveals children with a soft blur-up as they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Small uppercase eyebrow label above section headings. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`eyebrow ${className}`}>
      <span className="h-px w-8 bg-champagne-500" />
      {children}
    </span>
  )
}

type ButtonProps = {
  children: ReactNode
  href?: string
  onClick?: (e: MouseEvent) => void
  variant?: 'solid' | 'outline' | 'ghost'
  className?: string
  full?: boolean
}

/**
 * Refined pill button. Any button pointing at "#book" opens the booking modal
 * instead of jumping, so a single CTA target works site-wide.
 */
export function Button({ children, href = '#', onClick, variant = 'solid', className = '', full = false }: ButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-all duration-300'
  const styles: Record<string, string> = {
    solid: 'bg-ink-900 text-cream-100 hover:bg-ink-700',
    outline: 'border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-cream-100',
    ghost: 'text-ink-900 hover:text-champagne-600',
  }

  const handleClick = (e: MouseEvent) => {
    if (href === '#book') {
      e.preventDefault()
      bookingModal.open()
    }
    onClick?.(e)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${base} ${styles[variant]} ${full ? 'w-full' : ''} ${className}`}
    >
      {children}
    </a>
  )
}

/** Section wrapper with consistent horizontal padding + max width. */
export function Section({
  children,
  id,
  className = '',
}: {
  children: ReactNode
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-[1240px] px-6 md:px-10 ${className}`}>
      {children}
    </section>
  )
}
