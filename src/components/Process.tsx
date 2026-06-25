const steps = [
  { no: '01', title: 'Book & we arrive', body: 'Pick a time and tell us your vehicle. We roll up fully mobile with our own water, power and pro gear.' },
  { no: '02', title: 'Wash & decontaminate', body: 'Snow-foam pre-soak, two-bucket hand wash, wheels and tires, then iron and clay decon — safely lifting every speck of grime.' },
  { no: '03', title: 'Correct & protect', body: 'Machine polishing to kill swirls, then a sealant or ceramic coating locks in a deep, hydrophobic, long-lasting gloss.' },
  { no: '04', title: 'Interior & finish', body: 'Deep vacuum and extraction, steamed touch-points, dressed surfaces and streak-free glass. We hand it back showroom-fresh.' },
]

export default function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl">
          Four steps to a <span className="text-brand-400">flawless finish.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.no} className="card relative overflow-hidden p-7">
              <span className="font-display text-5xl font-extrabold text-brand-500/30">{s.no}</span>
              <h3 className="mt-3 font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
