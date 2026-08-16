import { useCountdown } from '../hooks/useCountdown'

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

export default function Countdown({ targetDateTime }) {
  const parts = useCountdown(targetDateTime)

  if (parts.isPast) {
    return <p className="text-center text-stone-500">저희, 결혼했습니다 🤍</p>
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center min-w-14">
          <span className="text-2xl sm:text-3xl font-serif tabular-nums text-stone-700">
            {String(parts[key]).padStart(2, '0')}
          </span>
          <span className="text-[11px] tracking-widest text-stone-400 uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
