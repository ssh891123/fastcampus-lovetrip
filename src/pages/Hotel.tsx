import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import useHotel from '@components/hotel/hook/useHotel'

import Top from '@shared/Top'
import Carousel from '@components/hotel/Carousel'
import Contents from '@components/hotel/Contents'
import Rooms from '@components/hotel/Rooms'
import Map from '@components/Map'
import RecommandHotels from '@components/RecommendHotels'
import ActionButtons from '@components/hotel/ActionButtons'
import Review from '@components/Review'
import ScrollProgressBar from '@shared/ScrollProgressBar'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>...Loading</div>
  }

  const { name, comment, images, contents, location, recommendHotels } = data

  return (
    <div>
      <ScrollProgressBar style={ScrollProgressBarStyle} />
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <ActionButtons hotel={data} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommandHotels recommendHotels={recommendHotels} />
      <Review hotelId={id} />
    </div>
  )
}

const ScrollProgressBarStyle = css`
  position: sticky;
  top: 64px;
  z-index: 2;
`

export default HotelPage
