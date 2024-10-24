import { useQuery } from 'react-query'
import { getRecommendHotels } from '@remote/hotel'

function useRecommedHotels({ hotelIds }: { hotelIds: string[] }) {
  return useQuery(
    ['recommendHotels', JSON.stringify(hotelIds)],
    () => getRecommendHotels(hotelIds),
    {
      enabled: hotelIds.length > 0, //조건이 맞을때만 호출하도록
    },
  )
}

export default useRecommedHotels
