// 청첩장에 들어갈 모든 데이터는 이 파일 하나에서 관리합니다.
// 새로운 섹션을 추가할 때도 필요한 데이터를 이 파일에 먼저 추가하세요.

export const invitation = {
  groom: {
    name: '홍길동',
    fatherName: '홍아버지',
    motherName: '김어머니',
    phone: '010-0000-0000',
  },
  bride: {
    name: '김영희',
    fatherName: '김아버지',
    motherName: '이어머니',
    phone: '010-0000-0000',
  },

  // ISO 8601, 한국 시간대(+09:00) 명시
  weddingDateTime: '2026-11-14T13:00:00+09:00',

  venue: {
    name: '00웨딩홀 3층 그랜드홀',
    address: '서울특별시 00구 00로 123',
    phone: '02-000-0000',
    lat: 37.5665,
    lng: 126.978,
    naverMapUrl: 'https://map.naver.com/p/search/00웨딩홀',
    kakaoMapUrl: 'https://map.kakao.com/link/search/00웨딩홀',
    tmapUrl: 'https://surl.tmap.co.kr/', // 필요 시 실제 링크로 교체
  },

  greetingTitle: '저희 결혼합니다',
  greetingMessage:
    '서로 다른 두 사람이 만나\n하나의 마음으로 살아가려 합니다.\n\n두 사람의 첫 걸음을\n따뜻한 마음으로 축복해 주세요.',

  // public/images 아래에 넣은 파일명을 순서대로 나열
  gallery: [
    '/images/gallery-01.jpg',
    '/images/gallery-02.jpg',
    '/images/gallery-03.jpg',
    '/images/gallery-04.jpg',
  ],

  music: {
    src: '/music/bgm.mp3',
    title: 'Wedding BGM',
  },

  // 카카오맵 JavaScript SDK 키 (https://developers.kakao.com 에서 발급)
  kakaoMapApiKey: '',

  // 계좌 정보 등, 나중에 섹션을 추가할 때 여기에 데이터만 늘리면 됩니다.
}
