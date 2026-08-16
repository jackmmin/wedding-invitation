import { AnimatePresence, motion } from 'framer-motion'

export default function GalleryLightbox({ images, index, onClose, onNavigate }) {
  if (index === null) return null

  const goto = (delta) => {
    const next = (index + delta + images.length) % images.length
    onNavigate(next)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          type="button"
          className="absolute top-5 right-5 text-white/80 text-3xl leading-none"
          onClick={onClose}
          aria-label="닫기"
        >
          &times;
        </button>

        <button
          type="button"
          className="absolute left-2 sm:left-6 text-white/70 text-4xl px-2"
          onClick={(e) => {
            e.stopPropagation()
            goto(-1)
          }}
          aria-label="이전 사진"
        >
          &#8249;
        </button>

        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          className="max-h-[85vh] max-w-full object-contain"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={(e) => e.stopPropagation()}
        />

        <button
          type="button"
          className="absolute right-2 sm:right-6 text-white/70 text-4xl px-2"
          onClick={(e) => {
            e.stopPropagation()
            goto(1)
          }}
          aria-label="다음 사진"
        >
          &#8250;
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
