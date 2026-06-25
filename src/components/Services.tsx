const services = [
  {
    title: 'Wheel & Tire Restoration',
    body: 'Iron decontamination, barrel-deep cleaning, calipers and lug seats, then tires dressed to a deep satin black.',
    icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  },
  {
    title: 'Snow-Foam Hand Wash',
    body: 'A clinging pH-neutral foam pre-soak lifts grit, then a gentle two-bucket hand wash — scratch-free, every time.',
    icon: 'M7 10a5 5 0 0 1 9.6-2A4 4 0 1 1 18 16H8a4 4 0 0 1-1-7.9z',
  },
  {
    title: 'Paint Correction',
    body: 'Machine polishing that levels swirls, holograms and light scratches for a deep, wet, mirror-like gloss.',
    icon: 'M3 17l6-6 4 4 8-8M14 7h7v7',
    stroke: true,
  },
  {
    title: 'Ceramic Coating',
    body: 'A pro-grade ceramic layer bonds to your paint for years of hydrophobic, UV-resistant, self-cleaning protection.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.4 13L7 11.4 8.4 10l2.2 2.2L15.6 7 17 8.4 10.6 15z',
  },
  {
    title: 'Interior Deep Clean',
    body: 'Full carpet & upholstery extraction, steam-cleaned touch-points, conditioned leather and streak-free glass.',
    icon: 'M4 17v-5a4 4 0 0 1 4-4h3l3-3v15H8a4 4 0 0 1-4-3zm14-9h2v9h-2z',
  },
  {
    title: 'Add-Ons',
    body: 'Engine bay cleaning, headlight restoration, pet-hair removal, odor treatment and ozone — built around your car.',
    icon: 'M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07-2.83 2.83M9.76 14.24l-2.83 2.83m0-12.14 2.83 2.83m4.48 4.48 2.83 2.83',
    stroke: true,
  },
]

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <p className="eyebrow">What we do</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl">
          Everything your car needs, <span className="text-brand-400">done right.</span>
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card group p-7 transition-colors hover:border-brand-500/40">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill={s.stroke ? 'none' : 'currentColor'} stroke={s.stroke ? 'currentColor' : 'none'} strokeWidth="2" strokeLinecap="round">
                  <path d={s.icon} />
                </svg>
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
