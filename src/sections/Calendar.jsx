import { invitation } from '../config/invitation.config'
import Countdown from '../components/Countdown'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

export default function Calendar() {
  const weddingDate = new Date(invitation.weddingDateTime)
  const year = weddingDate.getFullYear()
  const month = weddingDate.getMonth()
  const day = weddingDate.getDate()
  const cells = buildMonthGrid(year, month)

  return (
    <section className="px-6 py-20 max-w-sm mx-auto text-center">
      <h2 className="font-serif text-xl text-stone-800 mb-2">
        {year}년 {month + 1}월 {day}일
      </h2>
      <p className="text-stone-400 text-sm mb-10">
        {weddingDate.toLocaleDateString('ko-KR', { weekday: 'long' })}{' '}
        {weddingDate.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' })}
      </p>

      <div className="grid grid-cols-7 gap-y-3 text-sm mb-14">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-stone-400 text-xs">
            {w}
          </div>
        ))}
        {cells.map((d, i) => (
          <div key={i} className="flex items-center justify-center h-8">
            {d && (
              <span
                className={
                  d === day
                    ? 'w-8 h-8 flex items-center justify-center rounded-full bg-stone-700 text-white'
                    : 'text-stone-600'
                }
              >
                {d}
              </span>
            )}
          </div>
        ))}
      </div>

      <Countdown targetDateTime={invitation.weddingDateTime} />
    </section>
  )
}
