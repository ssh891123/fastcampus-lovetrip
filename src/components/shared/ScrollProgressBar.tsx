import { useEffect, useRef, useState } from 'react'
import { SerializedStyles } from '@emotion/react'

import { Colors, colors } from '@styles/colorPalette'

function ScrollProgressBar({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) {
  const [progress, setProcess] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const scroll = () => {
      //scrollTop: 원글 첫 위치부터 현재 화면에 보이는 부분까지 길이
      //scrollHeight: 전체 글의 길이
      //clientHeight: 현재 화면에 보이는 height
      const scrollTop = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      // 중복된 작업 방지
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setProcess(scrollTop / height)
      })
    }

    window.addEventListener('scroll', scroll)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div
      css={style}
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
        backgroundColor: colors[color],
        height: 8,
      }}
    ></div>
  )
}

export default ScrollProgressBar
