import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    // 브라우저 자동재생 정책 때문에 사용자가 첫 화면을 터치하면 재생을 시도합니다.
    const tryPlay = () => {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
      window.removeEventListener('pointerdown', tryPlay)
    }
    window.addEventListener('pointerdown', tryPlay, { once: true })
    return () => window.removeEventListener('pointerdown', tryPlay)
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  if (!src) return null

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioRef} src={src} loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? '음악 정지' : '음악 재생'}
        className="w-11 h-11 rounded-full bg-white/90 shadow-md flex items-center justify-center text-stone-600 border border-stone-200"
      >
        {playing ? '❚❚' : '♪'}
      </button>
    </div>
  )
}
