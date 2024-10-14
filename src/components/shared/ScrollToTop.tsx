import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// 화면이 전환되면 scroll을 최상단으로 변경하기 위함
// single page에선 화면이 전환되어도 scroll 유지되는 현상 있음
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default ScrollToTop
