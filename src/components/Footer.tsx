import { contactModal } from './useContactModal'

const groups = [
  { title: 'Services', links: ['Meta Ads', 'Google My Business', 'Website Development', 'Social Media', 'Voice AI Caller'] },
  { title: 'Company', links: ['Why us', 'Process', 'Packages', 'Results'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Contact'] },
]

const anchors: Record<string, string> = {
  'Why us': '#why',
  Process: '#process',
  Packages: '#packages',
  Results: '#results',
  'Meta Ads': '#services',
  'Google My Business': '#services',
  'Website Development': '#services',
  'Social Media': '#services',
  'Voice AI Caller': '#services',
}

const socials = [
  { label: 'Instagram', d: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM17.5 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z' },
  { label: 'Facebook', d: 'M13 22v-8h2.5l.5-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.3-3.7 3.8V11H7.5v3H10v8h3z' },
  { label: 'LinkedIn', d: 'M6.5 8A1.5 1.5 0 1 0 5 6.5 1.5 1.5 0 0 0 6.5 8zM5.5 9.5h2V19h-2V9.5zm4 0h1.9v1.3h.1c.3-.6 1.1-1.3 2.4-1.3 2.5 0 3 1.6 3 3.8V19h-2v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-2V9.5z' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-violet">
              <span className="absolute inset-0 rounded-xl bg-cyber-cyan/40 blur-md" />
              <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-ink-900" fill="currentColor">
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Front<span className="gradient-text">Desk</span>AI
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            Your all-in-one growth agency — ads, Google presence, websites, social, and AI call
            handling, fully managed under one roof.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <button
                key={s.label}
                type="button"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl glass text-white/60 transition-colors hover:text-cyber-cyan"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d={s.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-semibold text-white">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l}>
                  <a
                    href={anchors[l] ?? '#'}
                    onClick={
                      l === 'Contact'
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

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-8 pb-10 text-sm text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} FrontDeskAI. All rights reserved.</p>
        <p>Built for businesses that never want to miss a call.</p>
      </div>
    </footer>
  )
}
