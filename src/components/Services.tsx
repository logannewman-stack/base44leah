import { services } from '../data/salon'
import { Button, Eyebrow, Reveal, Section } from './ui'

export default function Services() {
  return (
    <Section id="services" className="py-24 md:py-32">
      <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-[1fr_auto]">
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="h-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">
            Services crafted<br className="hidden sm:block" /> around you
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-ink-700/75 md:text-right">
            From transformative extensions to a quiet, restorative pedicure — every service is
            tailored, unhurried and finished to perfection.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <article className="group h-full overflow-hidden rounded-[4px] border border-ink-900/10 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
              <div className="relative overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/25 to-transparent opacity-70" />
                <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 font-display text-sm font-semibold text-ink-900 backdrop-blur-sm">
                  0{i + 1}
                </span>
              </div>

              <div className="flex flex-col p-6">
                <h3 className="font-display text-2xl font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-700/75">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-[0.82rem] text-ink-700">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-champagne-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex justify-center">
          <Button href="#book" variant="solid">
            Reserve Your Chair
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
