import { testimonials } from '../data/salon'
import { Eyebrow, Reveal, Section } from './ui'

export default function Reviews() {
  return (
    <Section id="reviews" className="py-24 md:py-32">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>Kind words</Eyebrow>
          <h2 className="h-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">Loved by our guests</h2>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col rounded-[4px] border border-ink-900/10 bg-cream-50 p-8">
              <div className="flex gap-1 text-champagne-500">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-[1.3rem] font-medium italic leading-snug text-ink-800">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-ink-900/10 pt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-900">{t.name}</p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-taupe-600">{t.detail}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6 2.2 9l6.8-.8L12 2z" />
    </svg>
  )
}
