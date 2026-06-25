import { contactModal } from './useContactModal'

// Sparkle / shine mark matching the navbar logo.
const SHINE = 'M12 3l1.6 4.1a3 3 0 0 0 1.7 1.7L19.4 10l-4.1 1.6a3 3 0 0 0-1.7 1.7L12 17l-1.6-4.1a3 3 0 0 0-1.7-1.7L4.6 10l4.1-1.6a3 3 0 0 0 1.7-1.7z'

const groups = [
  { title: 'Services', links: ['Ceramic Coating', 'Paint Correction', 'Paint Protection Film', 'Interior Detailing', 'Mobile Wash'] },
  { title: 'Company', links: ['About', 'Why us', 'Packages', 'Reviews'] },
  { title: 'Get in touch', links: ['Book online', 'Service area', 'Contact'] },
]

// Footer links that should open the booking modal instead of navigating.
const modalLinks = new Set(['Book online', 'Contact'])

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-blue">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-900" fill="currentColor">
                <path d={SHINE} />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold">
              Detail on <span className="gradient-text">Demand</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-white/50">
            Premium mobile auto detailing, ceramic coatings, and paint correction — booked in
            60 seconds and brought right to your driveway.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-semibold text-white">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    onClick={
                      modalLinks.has(l)
                        ? (e) => {
                            e.preventDefault()
                            contactModal.open()
                          }
                        : undefined
                    }
                    className="text-sm text-white/50 transition-colors hover:text-cyber-cyan"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-8 text-sm text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} Detail on Demand. All rights reserved.</p>
        <p>Mobile auto detailing that comes to you.</p>
      </div>
    </footer>
  )
}
