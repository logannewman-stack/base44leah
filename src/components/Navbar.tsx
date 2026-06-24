import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { MagneticButton } from './ui'
import { contactModal } from './useContactModal'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Why us', href: '#why' },
  { label: 'Packages', href: '#packages' },
  { label: 'Results', href: '#results' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-glow' : 'border border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-violet">
            <span className="absolute inset-0 rounded-xl bg-cyber-cyan/40 blur-md" />
            <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-ink-900" fill="currentColor">
              <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Front<span className="gradient-text">Desk</span>AI
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyber-cyan to-cyber-violet transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton href="#contact" className="px-5 py-2.5 text-xs">
            Speak with a rep
          </MagneticButton>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 w-[calc(100%-2rem)] max-w-6xl rounded-2xl glass-strong p-4 md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-white/80 hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
              contactModal.open()
            }}
            className="mt-2 block rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-violet px-4 py-3 text-center font-semibold text-ink-900"
          >
            Speak with a representative
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
