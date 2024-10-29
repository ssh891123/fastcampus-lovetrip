import {
  collection,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  doc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { Like } from '@models/like'
import { Hotel } from '@models/hotel'

export async function getLikes({ userId }: { userId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId), //조건 추가
      orderBy('order', 'asc'), //정렬
    ),
  )

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

//이미 찜이 되었다면 -> 삭제
//찜 아니라면 -> 저장(등록)
export async function toggleLike({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'id' | 'name' | 'mainImageUrl'>
  userId: string
}) {
  // getDocs - 검색, query - query문 생성, collection - Like Collection 접근, where 조건 추가
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id),
    ),
  )

  //이미 존재함 -> 삭제
  if (findSnapshot.docs.length > 0) {
    //1, 2(삭제), 3, 4
    //[3, 4] data를 가져오고
    //order값을 -1로 변경 => 2, 3
    const removeTarget = findSnapshot.docs[0]
    const removeTargetOrder = removeTarget.data().order

    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    )

    if (updateTargetSnapshot.empty) {
      deleteDoc(removeTarget.ref)
    } else {
      const batch = writeBatch(store)

      const updateData = updateTargetSnapshot.forEach((doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 })
      })

      // 문서 업데이트
      await batch.commit()
      // target을 삭제함
      deleteDoc(removeTarget.ref)
    }
  } else {
    //없음 -> 생성
    //1. 맨 마지막 Like 정보 가져오기
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1),
      ),
    )

    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order

    const newLike = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      userId,
      order: lastOrder + 1,
    } as Like
    query(collection(store, COLLECTIONS.LIKE))

    //2. Like 정보 추가하기
    await setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike)
  }
}

export async function updateOrder(likes: Like[]) {
  const batch = writeBatch(store)

  likes.forEach((like) => {
    batch.update(doc(collection(store, COLLECTIONS.LIKE), like.id), {
      order: like.order,
    })
  })

  return batch.commit()
}
