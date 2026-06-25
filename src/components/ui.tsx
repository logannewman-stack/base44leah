import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { contactModal } from './useContactModal'

/** Subtle fade-up reveal as content scrolls into view (no 3D, no blur-heavy effects). */
export function Reveal({
  children,
  delay = 0,
  y = 28,
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
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Small gold all-caps eyebrow label above headings. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest2 ${light ? 'text-black/60' : 'text-gold'}`}>
      <span className="h-px w-7 bg-gold" />
      {children}
    </span>
  )
}

/**
 * Flat, premium button. Variants:
 *  - 'gold'    solid gold pill-less block (primary CTA)
 *  - 'outline' bordered ghost button
 *  - 'book'    inline gold "BOOK →" text link used inside cards
 * Any href of "#contact" opens the booking modal instead of navigating.
 */
export function Button({
  children,
  href = '#',
  variant = 'gold',
  className = '',
}: {
  children: ReactNode
  href?: string
  variant?: 'gold' | 'outline' | 'book'
  className?: string
}) {
  const onClick = (e: MouseEvent) => {
    if (href === '#contact') {
      e.preventDefault()
      contactModal.open()
    }
  }
  const cls = variant === 'gold' ? 'btn-gold' : variant === 'outline' ? 'btn-outline' : 'btn-book'
  return (
    <a href={href} onClick={onClick} className={`${cls} ${className}`}>
      {children}
    </a>
  )
}
