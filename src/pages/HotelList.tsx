import useHotels from '@components/hotelList/hooks/useHotels'

function HotelList() {
  const { data } = useHotels()
  console.log('hotelList', data)

  return <div>HotelList</div>
}

export default HotelList
