import { Reveal } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

export default function Gallery() {
  return (
    <section id="gallery" className="bg-brand-grey py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">Our Work</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.7] text-gray-700">
            Every car that leaves our hands is showroom ready.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {IMAGES.gallery.map((src, i) => (
            <Reveal key={i}>
              <div className="overflow-hidden rounded-xl shadow-md">
                <Photo src={src} alt={`Detailed vehicle ${i + 1}`} className="aspect-[4/3] w-full transition-transform duration-500 hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
