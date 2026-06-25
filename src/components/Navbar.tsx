import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { contactModal } from './useContactModal'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#how' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Reviews', href: '#reviews' },
]

const PHONE_DISPLAY = '(555) 010-2030'
const PHONE_HREF = 'tel:+15550102030'
const DROP = 'M12 3c3.5 4.5 6 7.6 6 10.6A6 6 0 0 1 6 13.6C6 10.6 8.5 7.5 12 3z'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d={DROP} />
        </svg>
      </span>
      <span className={`text-lg font-extrabold tracking-[-0.02em] ${dark ? 'text-white' : 'text-brand-ink'}`}>
        Detail on <span className="text-brand-blue">Demand</span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30))

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    contactModal.open()
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'border-slate-200 shadow-card' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-blue"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a href={PHONE_HREF} className="flex items-center gap-2 text-sm font-semibold text-brand-ink transition-colors hover:text-brand-blue">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-blue" fill="currentColor">
              <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
          {/* Book button: ghost at top, turns solid blue on scroll */}
          <a
            href="#contact"
            onClick={openModal}
            className={scrolled ? 'btn-primary' : 'btn-ghost'}
          >
            Book Now
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="text-brand-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-slate-700 hover:text-brand-blue"
            >
              {l.label}
            </a>
          ))}
          <a href={PHONE_HREF} className="block py-3 text-sm font-semibold text-brand-ink">
            {PHONE_DISPLAY}
          </a>
          <a href="#contact" onClick={openModal} className="btn-primary mt-2 w-full">
            Book Now
          </a>
        </div>
      )}
    </header>
  )
}
