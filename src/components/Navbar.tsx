import { useState } from 'react'
import { contactModal } from './useContactModal'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how' },
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
        Detail on Demand
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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-gray-700 transition-colors hover:text-brand-blue"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-blue transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a href={PHONE_HREF} className="flex items-center gap-2 text-sm font-semibold text-brand-blueDark transition-colors hover:text-brand-blue">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
          <a href="#contact" onClick={openModal} className="rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-blueDark">
            Book Now
          </a>
        </div>

        <button aria-label="Toggle menu" className="text-brand-ink md:hidden" onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-200 bg-white px-5 py-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-brand-blue">
              {l.label}
            </a>
          ))}
          <a href={PHONE_HREF} className="block py-3 text-sm font-semibold text-brand-blueDark">{PHONE_DISPLAY}</a>
          <a href="#contact" onClick={openModal} className="btn-primary mt-2 w-full">Book Now</a>
        </div>
      )}
    </header>
  )
}
