import { useMutation, useQuery } from 'react-query'
import { getHotelWithRoom } from '@remote/hotel'

import { useAlertContext } from '@contexts/AlertContext'
import { makeReservation } from '@remote/reservation'
import { Reservation } from '@models/reservation'

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()
  const { data, isLoading } = useQuery(
    ['hotelWithRoom', hotelId, roomId],
    () => getHotelWithRoom({ hotelId, roomId }),
    {
      onSuccess: ({ room }) => {
        if (room?.avaliableCount === 0) {
          open({
            title: '객실이 매진 되었습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
      },
    },
  )

  const { mutateAsync } = useMutation(
    (newReservation: Reservation) => {
      return makeReservation(newReservation)
    },
    {
      onError: (e: Error) => {
        if (e.message === 'no room') {
          open({
            title: '빈 객실이 없습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }

        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해 주세요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )

  return { data, isLoading, makeReservation: mutateAsync }
}

export default useReservation
