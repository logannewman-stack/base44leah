import { pricing } from '../data/salon'
import { Button, Eyebrow, Reveal, Section } from './ui'

export default function PriceList() {
  return (
    <div id="pricing" className="relative bg-cream-200/60">
      <Section className="py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>The menu</Eyebrow>
            <h2 className="h-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">Service &amp; pricing</h2>
            <p className="mx-auto mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ink-700/75">
              A starting guide to our most-loved services. Final pricing is confirmed at your
              complimentary consultation, tailored to your hair and goals.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
          {pricing.map((group, gi) => (
            <Reveal key={group.category} delay={(gi % 2) * 0.08}>
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-semibold text-ink-900">{group.category}</h3>
                  <span className="h-px flex-1 bg-ink-900/15" />
                </div>
                <ul className="mt-5 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[0.95rem] text-ink-800">{item.name}</span>
                        {item.note && (
                          <span className="text-[0.68rem] italic text-taupe-600">({item.note})</span>
                        )}
                      </div>
                      <span className="whitespace-nowrap font-display text-lg font-semibold text-champagne-600">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-sm italic text-ink-700/70">
              Prices are a starting point and may vary by length, density and desired result.
            </p>
            <Button href="#book" variant="solid">
              Request Your Consultation
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}
