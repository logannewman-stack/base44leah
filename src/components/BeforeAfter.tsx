import { Reveal } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

const items = [
  { label: 'Before', src: IMAGES.before, tone: 'bg-gray-900/80' },
  { label: 'After', src: IMAGES.after, tone: 'bg-brand-blue' },
]

export default function BeforeAfter() {
  return (
    <section className="bg-brand-grey py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <h2 className="h-section">See the Difference</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((it) => (
            <Reveal key={it.label}>
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <Photo src={it.src} alt={`${it.label} detailing`} className="aspect-[4/3] w-full" />
                <span className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white ${it.tone}`}>
                  {it.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[17px] leading-[1.7] text-gray-700">
            The results speak for themselves. Our customers call us back every time.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
