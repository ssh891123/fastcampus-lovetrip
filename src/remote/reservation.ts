import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from '@remote/firebase'
import { getHotel } from '@remote/hotel'

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

export async function getReservations({ userId }: { userId: string }) {
  const reservationQuery = query(
    collection(store, COLLECTIONS.RESERVATION),
    where('userId', '==', userId),
  )
  const snapshot = await getDocs(reservationQuery)

  const result = []

  for (let reservationDoc of snapshot.docs) {
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    }

    const hotel = await getHotel(reservation.hotelId)

    result.push({
      reservation,
      hotel,
    })
  }

  return result
}
