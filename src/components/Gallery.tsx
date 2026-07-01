import { images } from '../data/salon'
import { Eyebrow, Reveal, Section } from './ui'

// Editorial gallery grid. Swap these paths for your own photos anytime.
const shots = [
  { src: images.extensions, alt: 'Hand-tied extensions install', span: 'row-span-2' },
  { src: images.beforeAfter, alt: 'Color transformation', span: '' },
  { src: images.color, alt: 'Balayage & dimension', span: '' },
  { src: images.interior, alt: 'The salon studio', span: 'col-span-2' },
  { src: images.haircut, alt: 'Precision cut & style', span: 'row-span-2' },
  { src: images.extensionsDetail, alt: 'Weft detail', span: '' },
  { src: images.portrait, alt: 'Layla, behind the chair', span: '' },
]

export default function Gallery() {
  return (
    <Section id="gallery" className="py-24 md:py-32">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>The portfolio</Eyebrow>
          <h2 className="h-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">A look inside the studio</h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ink-700/75">
            A glimpse of the work, the space and the finishing touches that make every visit feel
            like a getaway.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {shots.map((s, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-[4px] border border-ink-900/10 ${s.span}`}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-ink-900/0 transition-colors duration-500 group-hover:bg-ink-900/20" />
              <figcaption className="absolute bottom-0 left-0 translate-y-2 p-4 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-cream-100 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {s.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
