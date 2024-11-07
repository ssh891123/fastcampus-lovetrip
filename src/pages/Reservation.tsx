import { useEffect } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import useReservation from '@components/reservation/hooks/useReservation'
import Form from '@components/reservation/Form'
import Summary from '@components/reservation/Summary'
import Spacing from '@shared/Spacing'
import addDelimeter from '@utils/addDelimeter'
import useUser from '@hooks/auth/useUser'
import { Reservation } from '@models/reservation'

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
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (
      [user, hotelId, roomId, startDate, endDate, nights].some((params) => {
        return params === null
      })
    ) {
      window.history.back()
    }
  }, [user, hotelId, roomId, startDate, endDate, nights])

  const { data, isLoading, makeReservation } = useReservation({
    hotelId,
    roomId,
  })
  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const handleSubmit = async (formValue: { [key: string]: string }) => {
    const newReservation: Reservation = {
      userId: user?.uid as string,
      hotelId: hotelId,
      roomId: roomId,
      startDate: startDate,
      endDate: endDate,
      price: room.price * Number(nights),
      formValue,
    }

    await makeReservation(newReservation)

    //TODO: 예약완료 페이지로 이동
    navigate(`/reservation/dom?hotelName=${hotel.name}`)
  }

  const buttonLabel = `${nights}박 ${addDelimeter(room.price * Number(nights))}원 예약하기`

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
      <Form
        forms={hotel.forms}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
