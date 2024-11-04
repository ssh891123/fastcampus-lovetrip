import { useEffect, useState } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import RangePicker from '@shared/RangePicker'
import FixedBottomButton from '@shared/FixedBottomButton'

function SchedulePage() {
  const { roomId = '', hotelId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    roomId: string
    hotelId: string
  }
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })

  useEffect(() => {
    // query string이 유실되었을때 예외처리
    if (roomId === '' || hotelId === '') {
      window.history.back()
    }
  }, [])

  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true },
    )

    navigate(`/reservation${params}`)
  }

  const 제출가능한가 =
    selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = 제출가능한가
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '예약 날짜를 선택해주세요'

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          console.log('사용처', dateRange)
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        onClick={moveToReservationPage}
        disabled={!제출가능한가}
      />
    </div>
  )
}

export default SchedulePage
