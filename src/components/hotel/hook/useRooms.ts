import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { onSnapshot, collection, doc } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { getRooms } from '@remote/room'

import { COLLECTIONS } from '@constants'
import { Room } from '@models/room'

function useRooms(hotelId: string) {
  const client = useQueryClient()

  useEffect(() => {
    // 실시간 data를 전달받기 위한 구독
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
      //변경된 정보를 snapshot으로 넘어옴
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }))

        // 캐싱 data를 newRooms로 변경
        client.setQueriesData(['rooms', hotelId], newRooms)
      },
    )

    return () => {
      // 구독중인 이벤트를 끊어주기 위함
      unsubscribe()
    }
  }, [hotelId, client])

  //배열 안에는 캐싱 key값
  return useQuery(['rooms', hotelId], () => getRooms(hotelId))
}

export default useRooms
