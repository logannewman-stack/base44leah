const groups = [
  { title: 'Product', links: ['How it works', 'Features', 'Pricing', 'Integrations'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Status'] },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-violet">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-900" fill="currentColor">
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold">
              Front<span className="gradient-text">Desk</span>AI
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-white/50">
            The AI receptionist that answers every call, books every job, and never misses a lead.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-semibold text-white">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/50 transition-colors hover:text-cyber-cyan">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-8 text-sm text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} FrontDeskAI. All rights reserved.</p>
        <p>Built for businesses that never want to miss a call.</p>
      </div>
    </footer>
  )
}
