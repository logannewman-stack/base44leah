import { contactModal } from './useContactModal'

const groups = [
  { title: 'Services', links: ['Meta Ads', 'Google My Business', 'Website Development', 'Social Media', 'Voice AI Caller'] },
  { title: 'Company', links: ['About', 'Why us', 'Packages', 'Results'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Contact'] },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-black/[0.06] pt-16 pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold">
              Front<span className="gradient-text">Desk</span>AI
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-neutral-500">
            Your all-in-one growth agency — ads, Google presence, websites, social, and AI call handling, fully managed.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm font-semibold text-neutral-900">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    onClick={
                      l === 'Contact'
                        ? (e) => {
                            e.preventDefault()
                            contactModal.open()
                          }
                        : undefined
                    }
                    className="text-sm text-neutral-500 transition-colors hover:text-cyber-cyan"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-black/[0.06] px-6 pt-8 text-sm text-neutral-400 sm:flex-row">
        <p>© {new Date().getFullYear()} FrontDeskAI. All rights reserved.</p>
        <p>Built for businesses that never want to miss a call.</p>
      </div>
    </footer>
  )
}
