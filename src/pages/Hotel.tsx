import { useParams } from 'react-router-dom'
import useHotel from '@components/hotel/hook/useHotel'

import Top from '@shared/Top'
import Carousel from '@components/hotel/Carousel'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>...Loading</div>
  }

  const { name, comment, images } = data

  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
    </div>
  )
}

export default HotelPage
