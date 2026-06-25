import { useState } from 'react'
import { contactModal } from './useContactModal'

const leftLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
]
const rightLinks = [
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
]
const allLinks = [...leftLinks, ...rightLinks]

const SHINE = 'M12 2l1.9 5a3 3 0 0 0 1.9 1.9L21 11l-5.2 2.1A3 3 0 0 0 13.9 15L12 20l-1.9-5a3 3 0 0 0-1.9-1.9L3 11l5.2-2.1A3 3 0 0 0 10.1 7z'

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap">
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold" fill="currentColor">
        <path d={SHINE} />
      </svg>
      <span className="font-display text-2xl uppercase leading-none tracking-tightest text-white">
        Detail on <span className="text-gold">Demand</span>
      </span>
    </a>
  )
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="text-xs font-bold uppercase tracking-widest2 text-white/80 transition-colors hover:text-gold"
    >
      {label}
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    contactModal.open()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <nav className="mx-auto max-w-7xl px-5">
        {/* Desktop: links split around a centered logo, BOOK NOW pinned right */}
        <div className="hidden h-20 grid-cols-[1fr_auto_1fr] items-center md:grid">
          <div className="flex items-center justify-start gap-9">
            {leftLinks.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </div>
          <div className="flex justify-center px-8">
            <Logo />
          </div>
          <div className="flex items-center justify-end gap-9">
            {rightLinks.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
            <a href="#contact" onClick={openModal} className="btn-gold px-6 py-3">
              Book now
            </a>
          </div>
        </div>

        {/* Mobile: logo left, hamburger right */}
        <div className="flex h-16 items-center justify-between md:hidden">
          <Logo />
          <button
            aria-label="Toggle menu"
            className="text-white"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black px-5 py-4 md:hidden">
          {allLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-bold uppercase tracking-widest2 text-white/85 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={openModal} className="btn-gold mt-3 w-full">
            Book now
          </a>
        </div>
      )}
    </header>
  )
}
