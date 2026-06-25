const stats = [
  { value: '2,000+', label: 'Cars detailed' },
  { value: '4.9★', label: '500+ 5-star reviews' },
  { value: '60 sec', label: 'To book online' },
  { value: '100%', label: 'Satisfaction guarantee' },
]

export default function Stats() {
  return (
    <section className="border-y border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-10 text-center">
            <p className="font-display text-4xl uppercase tracking-tightest text-gold sm:text-5xl">{s.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest2 text-white/55">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
