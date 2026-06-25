import { Button, Eyebrow, Reveal } from './ui'

const points = [
  'Years of protection — not weeks',
  'Deep, liquid-mirror gloss',
  'Hydrophobic — water & dirt slide right off',
  'UV, chemical & swirl resistance',
  'Backed by a multi-year warranty',
]

// Placeholder "photo" tiles — swap for real detailing photography when available.
const gallery = [
  { label: 'Gloss', grad: 'from-zinc-700 to-black' },
  { label: 'Hydrophobic', grad: 'from-amber-900/40 to-black' },
  { label: 'Paint correction', grad: 'from-neutral-700 to-black' },
  { label: 'Wheels & trim', grad: 'from-zinc-800 to-black' },
]

const SHINE = 'M12 2l1.9 5a3 3 0 0 0 1.9 1.9L21 11l-5.2 2.1A3 3 0 0 0 13.9 15L12 20l-1.9-5a3 3 0 0 0-1.9-1.9L3 11l5.2-2.1A3 3 0 0 0 10.1 7z'

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Ceramics() {
  return (
    <section id="ceramics" className="bg-black py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* left — heading + copy */}
        <Reveal>
          <Eyebrow>Signature Service</Eyebrow>
          <h2 className="mt-5 h-display text-6xl text-white sm:text-7xl">
            Ceramic
            <br />
            <span className="text-gold">Coatings</span>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-white/65">
            Our flagship treatment. We decontaminate and machine-polish your paint to a flawless
            finish, then bond a professional-grade 9H ceramic coating that transforms how your car
            looks, feels, and protects itself — for years to come.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-sm font-medium text-white/80">
                <Check />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="#contact" variant="gold" className="px-9 py-4">
              Book a coating
            </Button>
          </div>
        </Reveal>

        {/* right — photo gallery grid */}
        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          {gallery.map((g) => (
            <div
              key={g.label}
              className={`group relative flex aspect-square items-end overflow-hidden border border-white/10 bg-gradient-to-br ${g.grad}`}
            >
              <svg viewBox="0 0 24 24" className="absolute right-4 top-4 h-7 w-7 text-gold/40 transition-colors group-hover:text-gold" fill="currentColor">
                <path d={SHINE} />
              </svg>
              <span className="p-4 text-xs font-bold uppercase tracking-widest2 text-white/70">{g.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
