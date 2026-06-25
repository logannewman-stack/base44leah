import { booking } from './useBooking'

const groups = [
  { title: 'Services', links: ['Wheel Restoration', 'Snow-Foam Wash', 'Paint Correction', 'Ceramic Coating', 'Interior Detail'] },
  { title: 'Company', links: ['Our Work', 'Process', 'Pricing', 'Reviews'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 pt-16 pb-10">
      <div className="mx-auto grid max-w-site gap-10 px-5 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                <path d="M12 2.5c3 3.6 6.5 7.9 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.4 9 6.1 12 2.5z" />
              </svg>
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-white">SUD BUDS</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/50">
            Mobile auto detailing that brings the showroom to your driveway. Showroom shine, every time.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-semibold text-white">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l}>
                  <a href="#work" className="text-sm text-white/50 transition-colors hover:text-brand-400">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-semibold text-white">Get in touch</p>
          <p className="mt-4 text-sm text-white/50">Mobile service — we come to you.</p>
          <button onClick={() => booking.open()} className="btn-primary mt-4">
            Book a detail
          </button>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-site flex-col items-center justify-between gap-3 border-t border-white/10 px-5 pt-8 text-sm text-white/40 sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} Sud Buds Detailing. All rights reserved.</p>
        <p>Showroom shine, every time.</p>
      </div>
    </footer>
  )
}
