import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { salon } from '../data/salon'
import { bookingModal } from './useContactModal'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink-900/10 bg-cream-100/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[70px] w-full max-w-[1240px] items-center justify-between px-6 md:px-10">
        {/* Wordmark */}
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-semibold text-cream-100">
            {salon.monogram}
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-wide text-ink-900">{salon.name}</span>
            <span className="text-[0.58rem] font-medium uppercase tracking-luxe text-taupe-600">Salon Studio</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-700 transition-colors hover:text-ink-900"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={salon.phoneHref}
            className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-700 transition-colors hover:text-champagne-600"
          >
            {salon.phoneDisplay}
          </a>
          <button
            onClick={() => bookingModal.open()}
            className="rounded-full bg-ink-900 px-6 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-cream-100 transition-colors hover:bg-ink-700"
          >
            Book Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <div className="flex flex-col items-end gap-1.5">
            <span className={`h-px bg-ink-900 transition-all ${menuOpen ? 'w-6 translate-y-[7px] rotate-45' : 'w-6'}`} />
            <span className={`h-px bg-ink-900 transition-all ${menuOpen ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-px bg-ink-900 transition-all ${menuOpen ? 'w-6 -translate-y-[5px] -rotate-45' : 'w-6'}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-ink-900/10 bg-cream-100/95 backdrop-blur-md lg:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm font-medium uppercase tracking-[0.16em] text-ink-700"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              bookingModal.open()
            }}
            className="mt-3 rounded-full bg-ink-900 px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-cream-100"
          >
            Book an Appointment
          </button>
        </div>
      </motion.div>
    </motion.header>
  )
}
