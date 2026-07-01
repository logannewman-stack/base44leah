import { images } from '../data/salon'
import { Button, Eyebrow, ParallaxImage, Reveal } from './ui'

export default function BeforeAfter() {
  return (
    <div className="relative bg-cream-200/60">
      <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>Transformations</Eyebrow>
            <h2 className="h-display mt-5 text-[clamp(2.3rem,5vw,3.8rem)]">
              The art of the<br className="hidden sm:block" /> before &amp; after
            </h2>
            <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-ink-700/80">
              From lived-in blondes to rich, dimensional brunettes, every color is hand-painted to
              flatter your skin tone and grow out beautifully. This is what a thoughtful
              consultation and a skilled hand can do.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap gap-8">
              <Stat value="500+" label="Color services a year" />
              <Stat value="1-on-1" label="Custom consultation" />
              <Stat value="Bespoke" label="Every formula" />
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10">
              <Button href="#book" variant="outline">
                Start Your Transformation
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Image */}
        <Reveal delay={0.08}>
          <div className="relative">
            <ParallaxImage
              src={images.beforeAfter}
              alt="Before and after color transformation"
              strength={44}
              className="aspect-square w-full rounded-[4px] border border-ink-900/10 shadow-card"
            />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="rounded-full bg-cream-50/90 px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-luxe text-ink-900 backdrop-blur-sm">
                Before
              </span>
              <span className="rounded-full bg-ink-900/90 px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-luxe text-cream-100 backdrop-blur-sm">
                After
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-semibold text-ink-900">{value}</p>
      <p className="mt-1 text-[0.72rem] uppercase leading-snug tracking-[0.12em] text-taupe-600">{label}</p>
    </div>
  )
}
