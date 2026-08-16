import { useEffect, useRef, useState } from 'react'
import { invitation } from '../config/invitation.config'

function loadKakaoMapScript(appKey) {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao)

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`
    script.onload = () => window.kakao.maps.load(() => resolve(window.kakao))
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function Location() {
  const { venue } = invitation
  const mapRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!invitation.kakaoMapApiKey || !mapRef.current) return

    let cancelled = false
    loadKakaoMapScript(invitation.kakaoMapApiKey)
      .then((kakao) => {
        if (cancelled) return
        const center = new kakao.maps.LatLng(venue.lat, venue.lng)
        const map = new kakao.maps.Map(mapRef.current, { center, level: 3 })
        new kakao.maps.Marker({ position: center, map })
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [venue.lat, venue.lng])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // 클립보드 권한이 없는 환경은 조용히 무시
    }
  }

  return (
    <section className="px-6 py-20 max-w-md mx-auto text-center">
      <h2 className="font-serif text-xl text-stone-800 mb-2">오시는 길</h2>
      <p className="text-stone-700 mt-6">{venue.name}</p>
      <p className="text-stone-500 text-sm mt-1">{venue.address}</p>
      {venue.phone && <p className="text-stone-400 text-sm mt-1">{venue.phone}</p>}

      <button
        type="button"
        onClick={copyAddress}
        className="mt-4 text-xs px-4 py-2 border border-stone-300 rounded-full text-stone-500"
      >
        {copied ? '복사됨' : '주소 복사'}
      </button>

      {invitation.kakaoMapApiKey ? (
        <div ref={mapRef} className="w-full h-56 mt-8 bg-stone-100" />
      ) : (
        <div className="w-full h-40 mt-8 bg-stone-100 flex items-center justify-center text-stone-400 text-xs px-4">
          카카오맵 API 키를 config에 등록하면 지도가 표시됩니다
        </div>
      )}

      <div className="flex justify-center gap-3 mt-6 text-sm">
        <a
          href={venue.kakaoMapUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 border border-stone-300 rounded-full text-stone-600"
        >
          카카오맵
        </a>
        <a
          href={venue.naverMapUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 border border-stone-300 rounded-full text-stone-600"
        >
          네이버맵
        </a>
        <a
          href={venue.tmapUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 border border-stone-300 rounded-full text-stone-600"
        >
          티맵
        </a>
      </div>
    </section>
  )
}
