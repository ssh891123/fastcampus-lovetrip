import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@constants'
import { Hotel } from '@models/hotel'

// pageParam: 지금 보이는 맨 마지막 요소
export async function getHotels(pageParams?: QuerySnapshot<unknown>) {
  // 처음 호출인지
  const hotelQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        )

  const hotelsSnapshot = await getDocs(hotelQuery)

  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  return {
    items,
    lastVisible,
  }
}
