import { useEffect, useState } from 'react'

function diffToParts(targetTime) {
  const remaining = Math.max(0, targetTime - Date.now())
  const totalSeconds = Math.floor(remaining / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: remaining === 0,
  }
}

export function useCountdown(targetDateTime) {
  const targetTime = new Date(targetDateTime).getTime()
  const [parts, setParts] = useState(() => diffToParts(targetTime))

  useEffect(() => {
    const timer = setInterval(() => setParts(diffToParts(targetTime)), 1000)
    return () => clearInterval(timer)
  }, [targetTime])

  return parts
}
