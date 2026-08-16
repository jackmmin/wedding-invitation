import { useState } from 'react'
import { invitation } from '../config/invitation.config'
import GalleryLightbox from '../components/GalleryLightbox'

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const images = invitation.gallery

  if (!images.length) return null

  return (
    <section className="px-4 py-20 max-w-md mx-auto">
      <h2 className="font-serif text-xl text-stone-800 text-center mb-8">Gallery</h2>

      <div className="grid grid-cols-2 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className="aspect-square overflow-hidden bg-stone-100"
            onClick={() => setActiveIndex(i)}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      <GalleryLightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  )
}
