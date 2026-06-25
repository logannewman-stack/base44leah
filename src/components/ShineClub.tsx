import { Chip, Reveal, Button } from './ui'

const steps = [
  { n: '01', t: 'Book in 60 seconds', d: 'Pick your package and a time that works — upfront pricing, instant confirmation, zero phone tag.' },
  { n: '02', t: 'We come to you', d: 'A certified, fully-insured detailer arrives at your home or office with everything needed — water and power included.' },
  { n: '03', t: 'Enjoy the shine', d: 'Walk out to a flawless, protected vehicle. Add a recurring plan and never wash your own car again.' },
]

export default function Process() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Chip>How it works</Chip>
          </div>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">
            Three steps to a <span className="text-brand-blue">flawless finish.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px bg-slate-200 md:block" />
          {steps.map((s) => (
            <Reveal key={s.n} className="relative">
              <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue font-display text-2xl font-extrabold text-white shadow-blue">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-brand-ink">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="#contact" variant="primary" className="px-8 py-4 text-base">
            Book my detail
          </Button>
        </div>
      </div>
    </section>
  )
}
