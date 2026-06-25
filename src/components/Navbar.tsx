import { useState } from 'react'
import { contactModal } from './useContactModal'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'Reviews', href: '#reviews' },
]

const DROP = 'M12 3c3.5 4.5 6 7.6 6 10.6A6 6 0 0 1 6 13.6C6 10.6 8.5 7.5 12 3z'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d={DROP} />
        </svg>
      </span>
      <span className={`font-display text-lg font-bold tracking-[-0.02em] ${dark ? 'text-white' : 'text-brand-ink'}`}>
        Detail on <span className="text-brand-blue">Demand</span>
      </span>
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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Logo />

        <div className="hidden items-center gap-9 md:flex">
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

        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+10000000000" className="text-sm font-semibold text-brand-ink transition-colors hover:text-brand-blue">
            (000) 000-0000
          </a>
          <a href="#contact" onClick={openModal} className="btn-primary">
            Book now
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
          <a href="#contact" onClick={openModal} className="btn-primary mt-3 w-full">
            Book now
          </a>
        </div>
      )}
    </header>
  )
}
