import { Reveal } from './ui'

const stats = [
  { value: '2,000+', label: 'Cars detailed' },
  { value: '4.9★', label: '500+ 5-star reviews' },
  { value: '60 sec', label: 'To book online' },
  { value: '100%', label: 'Satisfaction guarantee' },
]

export default function Stats() {
  return (
    <section className="bg-white">
      <Reveal className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-200 shadow-card lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-9 text-center">
              <p className="font-display text-4xl font-extrabold tracking-[-0.02em] text-brand-blue sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
