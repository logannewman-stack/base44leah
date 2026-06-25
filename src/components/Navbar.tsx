import { useState } from 'react'
import { contactModal } from './useContactModal'

const leftLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
]
const rightLinks = [
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
]
const allLinks = [...leftLinks, ...rightLinks]

const PHONE_HREF = 'tel:+15550102030'
const DROP = 'M12 3c3.5 4.5 6 7.6 6 10.6A6 6 0 0 1 6 13.6C6 10.6 8.5 7.5 12 3z'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d={DROP} />
        </svg>
      </span>
      <span className={`text-lg font-extrabold tracking-[-0.02em] ${dark ? 'text-white' : 'text-brand-ink'}`}>
        Detail on Demand
      </span>
    </a>
  )
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="group relative text-xs font-semibold uppercase tracking-[0.12em] text-gray-700 transition-colors hover:text-brand-blue">
      {label}
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-blue transition-all duration-200 group-hover:w-full" />
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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      {/* Desktop: links split around a centered logo, BOOK NOW pinned right */}
      <nav className="relative mx-auto hidden h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:grid">
        <div className="flex items-center justify-end gap-8 pr-10">
          {leftLinks.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </div>
        <Logo />
        <div className="flex items-center justify-start gap-8 pl-10">
          {rightLinks.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </div>
        <a
          href="#contact"
          onClick={openModal}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-brand-blue px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition-colors hover:bg-brand-blueDark"
        >
          Book Now
        </a>
      </nav>

      {/* Mobile: logo left, hamburger right */}
      <nav className="flex h-16 items-center justify-between px-5 md:hidden">
        <Logo />
        <button aria-label="Toggle menu" className="text-brand-ink" onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-200 bg-white px-5 py-4 md:hidden">
          {allLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-700 hover:text-brand-blue">
              {l.label}
            </a>
          ))}
          <a href={PHONE_HREF} className="block py-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blueDark">(555) 010-2030</a>
          <a href="#contact" onClick={openModal} className="btn-primary mt-2 w-full uppercase tracking-[0.12em]">Book Now</a>
        </div>
      )}
    </header>
  )
}
