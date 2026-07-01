import { salon } from '../data/salon'
import { bookingModal } from './useContactModal'

const nav = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
]

export default function Footer() {
  return (
    <footer className="bg-cream-100 pb-10 pt-16">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-ink-900/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-display text-base font-semibold text-cream-100">
                {salon.monogram}
              </span>
              <div className="leading-none">
                <p className="font-display text-xl font-semibold text-ink-900">{salon.name}</p>
                <p className="text-[0.58rem] font-medium uppercase tracking-luxe text-taupe-600">Salon Studio</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-ink-700/70">
              {salon.tagline} in {salon.city}. Extensions, color, cuts, manicures &amp; pedicures —
              all under one roof.
            </p>
            <button
              onClick={() => bookingModal.open()}
              className="mt-6 rounded-full border border-ink-900/25 px-6 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-cream-100"
            >
              Book Now
            </button>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-luxe text-taupe-600">Explore</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="link-underline text-[0.92rem] text-ink-700 transition-colors hover:text-ink-900"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-luxe text-taupe-600">Visit</p>
            <ul className="mt-5 space-y-3 text-[0.92rem] text-ink-700/85">
              <li>{salon.addressLine1}</li>
              <li>{salon.addressLine2}</li>
              <li>
                <a href={salon.phoneHref} className="link-underline transition-colors hover:text-ink-900">
                  {salon.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${salon.email}`} className="link-underline transition-colors hover:text-ink-900">
                  {salon.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-4">
              <a href={salon.instagram} aria-label="Instagram" className="text-ink-700 transition-colors hover:text-champagne-600">
                <Instagram />
              </a>
              <a href={salon.facebook} aria-label="Facebook" className="text-ink-700 transition-colors hover:text-champagne-600">
                <Facebook />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-[0.75rem] text-taupe-600">
            © {new Date().getFullYear()} {salon.fullName}. All rights reserved.
          </p>
          <p className="text-[0.75rem] text-taupe-600">Des Moines, Iowa · By appointment</p>
        </div>
      </div>
    </footer>
  )
}

function Instagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Facebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0022 12z" />
    </svg>
  )
}
