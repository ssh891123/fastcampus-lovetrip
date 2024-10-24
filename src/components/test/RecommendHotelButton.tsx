import { collection, writeBatch, getDocs } from 'firebase/firestore'

import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import Button from '@shared/Button'

function RecommendHotelButton() {
  const handleButtonClick = async () => {
    //1. 전체 호텔 가져오기
    //2. 전체 호텔 루프
    //3. 호텔 + 추천 호텔 아이디 5개를 추가하겠습니다.
    // 호텔 아이디를 추가하는 이유: 호텔 정보가 변경되었을때 대응하기 위함
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshot.docs.forEach((hotel) => {
      const 추천호텔리스트 = []

      for (let doc of snapshot.docs) {
        if (추천호텔리스트.length === 5) {
          break
        }

        if (doc.id !== hotel.id) {
          추천호텔리스트.push(doc.id)
        }
      }

      batch.update(hotel.ref, {
        recommendHotels: 추천호텔리스트,
      })
    })

    await batch.commit()

    alert('업데이트가 완료되었습니다')
  }

  return <Button onClick={handleButtonClick}>추천호텔 데이터 추가하기</Button>
}

export default RecommendHotelButton
