import { Chip, Reveal } from './ui'

const steps = [
  {
    n: '1',
    t: 'Book Online',
    d: 'Choose your service and a time that works in about 60 seconds. Upfront pricing, instant confirmation.',
    icon: 'M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zM5 9h14v10H5V9z',
  },
  {
    n: '2',
    t: 'We Come to You',
    d: 'A certified, fully-insured detailer arrives at your home or office with everything needed — water and power included.',
    icon: 'M3 13l2-5h11l3 4h2v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-2z',
  },
  {
    n: '3',
    t: 'Drive Away Gleaming',
    d: 'Walk out to a flawless, protected vehicle. Add a recurring plan and never wash your own car again.',
    icon: 'M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="bg-brand-grey py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Chip>How it works</Chip>
          </div>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">3 Steps to a Spotless Car</h2>
        </Reveal>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px bg-slate-300 md:block" />
          {steps.map((s) => (
            <Reveal key={s.n}>
              <div className="relative flex flex-col items-center rounded-card border border-slate-200 bg-white p-8 text-center shadow-card">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-blue">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </span>
                <span className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-blue">Step {s.n}</span>
                <h3 className="mt-1 text-xl font-bold text-brand-ink">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
