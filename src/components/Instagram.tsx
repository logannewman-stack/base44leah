import { Chip, Reveal } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

// Varied aspect ratios create the masonry rhythm.
const aspects = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]']

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Chip>Our work</Chip>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">See the shine for yourself.</h2>
          <p className="mt-5 text-lg text-slate-600">
            A look at recent details — coatings, corrections, and full transformations.
          </p>
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {IMAGES.gallery.map((src, i) => (
            <div key={i} className="mb-5 break-inside-avoid">
              <Reveal>
                <Photo
                  src={src}
                  alt={`Detailed vehicle ${i + 1}`}
                  className={`${aspects[i % aspects.length]} w-full rounded-card shadow-card transition-transform duration-500 hover:scale-[1.02]`}
                />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
