import { collection, doc, getDocs, writeBatch } from 'firebase/firestore'

import { FORMS } from '@/mock/data'
import { store } from '@remote/firebase'
import Button from '@shared/Button'
import { COLLECTIONS } from '@constants'

function HotelFormAddButton() {
  const handleClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshot.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      })
    })

    await batch.commit()

    alert('폼 데이터 추가 완료!')
  }

  return (
    <div>
      <Button onClick={handleClick}>폼 데이터 추가</Button>
    </div>
  )
}

export default HotelFormAddButton
