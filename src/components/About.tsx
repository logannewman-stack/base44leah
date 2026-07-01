import { images, salon, stats } from '../data/salon'
import { Button, Eyebrow, Reveal, Section } from './ui'

export default function About() {
  return (
    <div id="about" className="relative bg-cream-200/60">
      <Section className="py-24 md:py-32">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Portrait */}
          <Reveal className="order-1">
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-[4px] border border-ink-900/10 shadow-card">
                <img
                  src={images.portrait}
                  alt={`${salon.owner}, owner and lead stylist`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              {/* signature card */}
              <div className="absolute -right-3 -top-3 rounded-[4px] border border-ink-900/10 bg-cream-50 px-5 py-3 shadow-soft sm:-right-6">
                <p className="font-display text-xl italic text-ink-900">Layla</p>
                <p className="text-[0.6rem] font-medium uppercase tracking-luxe text-taupe-600">Owner & Stylist</p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-2">
            <Reveal>
              <Eyebrow>Meet your stylist</Eyebrow>
              <h2 className="h-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">
                Artistry, warmth<br className="hidden sm:block" /> & an eye for detail
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-[1rem] leading-relaxed text-ink-700/80">
                <p>
                  Hi, I&apos;m {salon.owner} — the heart behind the chair. What began as a love for
                  transforming hair has grown into a full-service salon studio in {salon.city}, where
                  extensions, color and precision cutting are my craft.
                </p>
                <p>
                  I believe great hair is equal parts technical skill and genuine connection. Every
                  guest gets an honest consultation, a customized plan, and a finished look that feels
                  effortlessly <span className="italic text-champagne-600">you</span> — long after you
                  leave the studio.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9">
                <Button href="#book" variant="outline">
                  Book With Layla
                </Button>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.22}>
              <div className="mt-12 grid grid-cols-2 gap-6 border-t border-ink-900/10 pt-9 sm:grid-cols-4">
                {stats.map((st) => (
                  <div key={st.label}>
                    <p className="font-display text-4xl font-semibold text-ink-900">{st.value}</p>
                    <p className="mt-1.5 text-[0.72rem] uppercase leading-snug tracking-[0.12em] text-taupe-600">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  )
}
