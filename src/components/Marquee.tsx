const words = [
  'Hair Extensions',
  'Balayage',
  'Vivid Color',
  'Precision Cuts',
  'Blowouts',
  'Manicures',
  'Pedicures',
  'Bridal Styling',
  'Color Correction',
  'Gel Nails',
]

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-ink-900/10 bg-ink-900 py-5">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex shrink-0 items-center" aria-hidden={rep === 1}>
            {words.map((w) => (
              <span key={w + rep} className="flex items-center">
                <span className="whitespace-nowrap px-8 font-display text-xl italic text-cream-100/90 sm:text-2xl">
                  {w}
                </span>
                <span className="h-1 w-1 rounded-full bg-champagne-500" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
