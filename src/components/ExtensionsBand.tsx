import { images } from '../data/salon'
import { Button, Eyebrow, ParallaxImage, Reveal } from './ui'

const highlights = [
  { n: '01', t: 'Consultation', d: 'We match density, tone and lifestyle to the right method — hand-tied, weft or tape-in.' },
  { n: '02', t: 'Seamless Install', d: 'Rows placed and color-matched by hand so the blend is completely undetectable.' },
  { n: '03', t: 'Move-Up Care', d: 'Simple maintenance visits keep your extensions comfortable, healthy and flawless.' },
]

export default function ExtensionsBand() {
  return (
    <div className="relative overflow-hidden bg-ink-900 text-cream-100">
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-champagne-500/10 blur-[130px]" />

      <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Images — overlapping pair */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
            <ParallaxImage
              src={images.extensions}
              alt="Hand-tied hair extensions being installed"
              strength={50}
              className="aspect-[4/5] w-[82%] rounded-[4px] border border-cream-100/15 shadow-card"
            />
            <ParallaxImage
              src={images.extensionsDetail}
              alt="Close-up of a hand-tied weft row"
              strength={30}
              className="absolute -bottom-10 right-0 aspect-[3/4] w-[46%] rounded-[4px] border-4 border-ink-900 shadow-card"
            />
            {/* badge */}
            <div className="absolute -top-5 left-4 rounded-full bg-champagne-500 px-5 py-2 font-display text-sm font-semibold italic text-ink-900 shadow-soft">
              The Specialty
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow className="text-champagne-400">Hair extensions</Eyebrow>
            <h2 className="h-display mt-5 text-[clamp(2.3rem,5vw,3.8rem)] text-cream-100">
              Length, fullness &amp;<br className="hidden sm:block" /> a flawless blend
            </h2>
            <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-cream-100/70">
              Extensions are where Layla&apos;s artistry shines. Every install is custom
              color-matched and placed by hand for movement and dimension that look and feel like
              your own hair — never bulky, never obvious.
            </p>
          </Reveal>

          <div className="mt-10 space-y-px overflow-hidden rounded-[4px] border border-cream-100/12">
            {highlights.map((h, i) => (
              <Reveal key={h.n} delay={i * 0.08}>
                <div className="flex items-start gap-5 bg-cream-100/[0.04] px-6 py-5">
                  <span className="font-display text-2xl font-semibold text-champagne-400">{h.n}</span>
                  <div>
                    <p className="font-display text-xl font-semibold text-cream-100">{h.t}</p>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-cream-100/65">{h.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-9">
              <Button
                href="#book"
                variant="solid"
                className="bg-cream-100 text-ink-900 hover:bg-champagne-400"
              >
                Book an Extension Consult
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
