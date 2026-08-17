import { useEffect, useRef, useState } from 'react'
import { invitation } from '../config/invitation.config'

function loadNaverMapScript(clientId) {
  return new Promise((resolve, reject) => {
    if (window.naver?.maps) return resolve(window.naver)

    const script = document.createElement('script')
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
    script.onload = () => resolve(window.naver)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

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

function NaverMap({ venue, clientId }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!clientId || !mapRef.current) return
    let cancelled = false

    loadNaverMapScript(clientId)
      .then((naver) => {
        if (cancelled) return
        const center = new naver.maps.LatLng(venue.lat, venue.lng)
        const map = new naver.maps.Map(mapRef.current, { center, zoom: 16 })
        new naver.maps.Marker({ position: center, map })
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [venue.lat, venue.lng, clientId])

  return <div ref={mapRef} className="w-full h-56 mt-8 bg-stone-100" />
}

function KakaoMap({ venue, appKey }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!appKey || !mapRef.current) return
    let cancelled = false

    loadKakaoMapScript(appKey)
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
  }, [venue.lat, venue.lng, appKey])

  return <div ref={mapRef} className="w-full h-56 mt-8 bg-stone-100" />
}

export default function Location() {
  const { venue, map } = invitation
  const [copied, setCopied] = useState(false)

  const provider = map.provider === 'kakao' ? 'kakao' : 'naver'
  const apiKey = provider === 'kakao' ? map.kakaoAppKey : map.naverClientId
  const providerLabel = provider === 'kakao' ? '카카오맵' : '네이버지도'

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

      {apiKey ? (
        provider === 'kakao' ? (
          <KakaoMap venue={venue} appKey={apiKey} />
        ) : (
          <NaverMap venue={venue} clientId={apiKey} />
        )
      ) : (
        <div className="w-full h-40 mt-8 bg-stone-100 flex items-center justify-center text-stone-400 text-xs px-4">
          {`config의 map.${provider === 'kakao' ? 'kakaoAppKey' : 'naverClientId'}를 등록하면 ${providerLabel}가 표시됩니다`}
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
