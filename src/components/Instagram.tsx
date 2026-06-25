import { Reveal } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

function PlayIcon() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-black/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
      <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 text-white" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-blueDark">The Gallery</p>
            <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-[-0.01em] text-brand-ink sm:text-5xl">Our Work</h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-gray-300 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-ink transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            @detailondemand
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {IMAGES.gallery.map((src, i) => (
            <Reveal key={i}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-xl">
                <Photo src={src} alt={`Detailed vehicle ${i + 1}`} className="aspect-square w-full" />
                <span className="absolute inset-0 flex items-center justify-center bg-brand-ink/0 transition-colors duration-300 group-hover:bg-brand-ink/30">
                  <PlayIcon />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
