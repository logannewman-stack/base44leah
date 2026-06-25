const badges = [
  { icon: 'star', text: '4.9/5 from 500+ reviews' },
  { icon: 'car', text: '2,000+ cars detailed' },
  { icon: 'shield', text: 'Fully insured & licensed' },
  { icon: 'calendar', text: 'Same-week availability' },
]

const ICONS: Record<string, string> = {
  star: 'M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z',
  car: 'M3 13l2-5h11l3 4h2v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-2z',
  shield: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
  calendar: 'M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zM5 9h14v10H5V9z',
}

export default function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-brand-grey">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5">
        {badges.map((b, i) => (
          <div key={b.text} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-blue" fill="currentColor">
                <path d={ICONS[b.icon]} />
              </svg>
              <span className="text-sm font-medium text-slate-700">{b.text}</span>
            </div>
            {i < badges.length - 1 && <span className="hidden h-4 w-px bg-slate-300 sm:block" />}
          </div>
        ))}
      </div>
    </section>
  )
}
