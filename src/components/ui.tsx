import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { contactModal } from './useContactModal'

/** Subtle fade-up reveal as content scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
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

/** Small light-blue pill chip used above section headings. */
export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>
}

/**
 * Button. Variants: 'primary' (light-blue), 'dark' (ink), 'ghost' (outline).
 * Any href of "#contact" opens the booking modal instead of navigating.
 */
export function Button({
  children,
  href = '#',
  variant = 'primary',
  className = '',
}: {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'dark' | 'ghost'
  className?: string
}) {
  const onClick = (e: MouseEvent) => {
    if (href === '#contact') {
      e.preventDefault()
      contactModal.open()
    }
  }
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'dark' ? 'btn-dark' : 'btn-ghost'
  return (
    <a href={href} onClick={onClick} className={`${cls} ${className}`}>
      {children}
    </a>
  )
}

/** Inline arrow → icon. */
export function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
