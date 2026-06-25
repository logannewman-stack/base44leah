import { contactModal } from './useContactModal'

const groups = [
  { title: 'Services', links: ['Wheel Restoration', 'Snow Foam Wash', 'Paint Correction', 'Ceramic Coating', 'Interior Detail'] },
  { title: 'Company', links: ['The Process', 'Why us', 'Packages', 'Reviews'] },
  { title: 'Get in touch', links: ['Book a detail', 'Service area', 'Contact'] },
]

/** Sud Buds water-drop mark. */
function DropMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.5c3 3.6 6.5 7.9 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.4 9 6.1 12 2.5z" />
      <ellipse cx="9.6" cy="13.4" rx="1.1" ry="1.8" fill="#fff" opacity="0.7" transform="rotate(-18 9.6 13.4)" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-blue">
              <DropMark className="h-5 w-5 text-ink-900" />
            </span>
            <span className="font-display text-lg font-semibold">
              Sud<span className="gradient-text"> Buds</span> Detailing
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-white/50">
            Mobile auto detailing that brings the showroom to your driveway — wheels, foam baths,
            paint correction, ceramic coating, and deep interior care.
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
                      l === 'Contact' || l === 'Book a detail'
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
        <p>© {new Date().getFullYear()} Sud Buds Detailing. All rights reserved.</p>
        <p>Showroom shine, every time — we come to you.</p>
      </div>
    </footer>
  )
}
