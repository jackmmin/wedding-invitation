import { motion } from 'framer-motion'
import { invitation } from '../config/invitation.config'

export default function Cover() {
  const date = new Date(invitation.weddingDateTime)
  const dateLabel = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
      <motion.p
        className="tracking-[0.3em] text-xs text-stone-400 uppercase mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Wedding Invitation
      </motion.p>

      <motion.h1
        className="font-serif text-3xl sm:text-4xl text-stone-800 leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {invitation.groom.name}
        <span className="mx-3 text-stone-300">&</span>
        {invitation.bride.name}
      </motion.h1>

      <motion.p
        className="mt-8 text-stone-500 text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {dateLabel}
        <br />
        {invitation.venue.name}
      </motion.p>
    </section>
  )
}
