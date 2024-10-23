import { useParams } from 'react-router-dom'
import useHotel from '@components/hotel/hook/useHotel'

import Top from '@shared/Top'
import Carousel from '@components/hotel/Carousel'
import Contents from '@components/hotel/Contents'
import Rooms from '@components/hotel/Rooms'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>...Loading</div>
  }

  const { name, comment, images, contents } = data

  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
    </div>
  )
}

export default HotelPage