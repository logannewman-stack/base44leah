import { contactModal } from './useContactModal'

const SHINE = 'M12 2l1.9 5a3 3 0 0 0 1.9 1.9L21 11l-5.2 2.1A3 3 0 0 0 13.9 15L12 20l-1.9-5a3 3 0 0 0-1.9-1.9L3 11l5.2-2.1A3 3 0 0 0 10.1 7z'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.43 9.04 3.42 9.4 3.42 12s0 2.96.08 4.2c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.07-1.24.07-1.59.07-4.2s0-2.96-.07-4.2c-.04-.9-.19-1.38-.32-1.7a2.86 2.86 0 0 0-.68-1.06 2.86 2.86 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zM17.4 6.4a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'M14 9h2.5l.5-3H14V4.5c0-.87.3-1.5 1.6-1.5H17V.3C16.7.26 15.8.2 14.8.2 12.6.2 11 1.54 11 4.1V6H8.5v3H11v8h3V9z' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'M16 3c.3 2 1.6 3.6 3.6 3.9v2.6c-1.2.1-2.4-.2-3.5-.8v5.6a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.08v2.7a2.6 2.6 0 1 0 1.8 2.5V3H16z' },
]

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'The Shine Club', href: '#contact', modal: true },
]

const serviceLinks = ['Ceramic Coating', 'Paint Correction', 'Paint Protection Film', 'Interior Detailing', 'Mobile Wash']

export default function Footer() {
  const open = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }

  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-4">
        {/* brand */}
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="currentColor">
              <path d={SHINE} />
            </svg>
            <span className="font-display text-2xl uppercase tracking-tightest text-white">
              Detail on <span className="text-gold">Demand</span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            Premium mobile auto detailing, ceramic coatings, and paint correction — brought right to
            your driveway.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* quick links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest2 text-white">Quick Links</p>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={l.modal ? open : undefined}
                  className="text-sm text-white/55 transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* inquire */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest2 text-white">Inquire</p>
          <p className="mt-5 text-sm leading-relaxed text-white/55">
            Get a free, no-pressure quote for your vehicle in under a minute.
          </p>
          <a href="#contact" onClick={open} className="btn-gold mt-5 w-full">
            Request a free quote
          </a>
          <p className="mt-5 text-sm text-white/55">
            <a href="tel:+10000000000" className="transition-colors hover:text-gold">(000) 000-0000</a>
          </p>
          <p className="text-sm text-white/55">
            <a href="mailto:hello@detailondemand.com" className="transition-colors hover:text-gold">hello@detailondemand.com</a>
          </p>
        </div>

        {/* services */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest2 text-white">Services</p>
          <ul className="mt-5 space-y-3">
            {serviceLinks.map((l) => (
              <li key={l}>
                <a href="#services" className="text-sm text-white/55 transition-colors hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-6 pt-8 text-xs text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} Detail on Demand. All rights reserved.</p>
        <p className="uppercase tracking-wider2">Mobile auto detailing that comes to you</p>
      </div>
    </footer>
  )
}
