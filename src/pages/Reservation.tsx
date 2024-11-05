import { useEffect } from 'react'
import qs from 'qs'

import useReservation from '@components/reservation/hooks/useReservation'
import Summary from '@components/reservation/Summary'
import Spacing from '@shared/Spacing'

function ReservationPage() {
  const { hotelId, roomId, startDate, endDate, nights } = qs.parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  ) as {
    hotelId: string
    roomId: string
    startDate: string
    endDate: string
    nights: string
  }

  useEffect(() => {
    if (
      [hotelId, roomId, startDate, endDate, nights].some((params) => {
        return params === null
      })
    ) {
      window.history.back()
    }
  }, [hotelId, roomId, startDate, endDate, nights])

  const { data, isLoading } = useReservation({ hotelId, roomId })
  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
    </div>
  )
}

export default ReservationPage
