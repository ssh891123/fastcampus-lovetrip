import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { store } from '@remote/firebase'

import { Reservation } from '@models/reservation'
import { Room } from '@models/room'
import { COLLECTIONS } from '@constants'

export async function makeReservation(newReservation: Reservation) {
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )

  const room = roomSnapshot.data() as Room
  const 지금잔여객실수 = room.avaliableCount

  if (지금잔여객실수 === 0) {
    throw new Error('no room')
  }

  //2개의 비동기 함수
  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      avaliableCount: 지금잔여객실수 - 1,
    }),
    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}
