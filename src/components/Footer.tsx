import { contactModal } from './useContactModal'
import { Logo } from './Navbar'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 4.86A4.94 4.94 0 1 0 12 17a4.94 4.94 0 0 0 0-9.94zm0 8.14a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.4 6.4a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'M14 9h2.5l.5-3H14V4.5c0-.87.3-1.5 1.6-1.5H17V.3C16.7.26 15.8.2 14.8.2 12.6.2 11 1.54 11 4.1V6H8.5v3H11v8h3V9z' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'M16 3c.3 2 1.6 3.6 3.6 3.9v2.6c-1.2.1-2.4-.2-3.5-.8v5.6a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.08v2.7a2.6 2.6 0 1 0 1.8 2.5V3H16z' },
]

const serviceLinks = ['Exterior Detail', 'Full Detail', 'Ceramic Coating', 'Paint Correction', 'Interior Deep Clean']
const companyLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Reviews', href: '#reviews' },
]

export default function Footer() {
  const open = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
            Premium mobile auto detailing brought right to your driveway. Showroom results, zero
            hassle.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-brand-blue hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-brand-ink">Services</p>
          <ul className="mt-5 space-y-3">
            {serviceLinks.map((l) => (
              <li key={l}>
                <a href="#services" className="text-sm text-slate-500 transition-colors hover:text-brand-blue">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold text-brand-ink">Company</p>
          <ul className="mt-5 space-y-3">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-slate-500 transition-colors hover:text-brand-blue">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold text-brand-ink">Get in touch</p>
          <p className="mt-5 text-sm text-slate-500">
            <a href="tel:+15550102030" className="transition-colors hover:text-brand-blue">(555) 010-2030</a>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            <a href="mailto:hello@detailondemand.com" className="transition-colors hover:text-brand-blue">hello@detailondemand.com</a>
          </p>
          <p className="mt-2 text-sm text-slate-500">Serving the metro area &amp; 25 miles out</p>
          <a href="#contact" onClick={open} className="btn-primary mt-5 w-full">
            Book Now
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-slate-200 px-6 pt-8 text-xs text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Detail on Demand. All rights reserved.</p>
        <p>Mobile auto detailing that comes to you.</p>
      </div>
    </footer>
  )
}
