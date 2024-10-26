import { useEffect } from 'react'

declare global {
  interface Window {
    Kakao: any
  }
}

function useLoadKakao() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
    script.async = true //비동기 처리를 위한 설정

    document.head.appendChild(script)
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY)
        console.log(window.Kakao.Share)
      }
    }
  }, [])
}

export default useLoadKakao