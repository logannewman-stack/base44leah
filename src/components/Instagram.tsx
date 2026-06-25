import { Chip, Reveal } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Chip>The gallery</Chip>
            <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">
              Results that <span className="text-brand-blue">speak for themselves.</span>
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Follow @detailondemand
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {IMAGES.gallery.map((src, i) => (
            <Reveal key={i}>
              <div className="overflow-hidden rounded-2xl shadow-card">
                <Photo
                  src={src}
                  alt={`Detailed vehicle ${i + 1}`}
                  className="aspect-square w-full transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
