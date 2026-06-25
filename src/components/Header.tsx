import { useEffect, useState } from 'react'
import { booking } from './useBooking'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
]

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d="M12 2.5c3 3.6 6.5 7.9 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.4 9 6.1 12 2.5z" />
          <ellipse cx="9.6" cy="13.4" rx="1" ry="1.7" fill="#fff" opacity="0.7" transform="rotate(-18 9.6 13.4)" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight text-white">
        SUD BUDS <span className="font-medium text-white/45">DETAILING</span>
      </span>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink-950/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-5 py-3.5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/65 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => booking.open()} className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
            Book now
          </button>
          <button aria-label="Menu" className="text-white md:hidden" onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 px-5 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-white/80 hover:bg-white/5">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              booking.open()
            }}
            className="btn-primary mt-2 w-full"
          >
            Book now
          </button>
        </div>
      )}
    </header>
  )
}
