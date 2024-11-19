import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getHotels } from '@remote/hotel'

function useHotels() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage, //다음 페이지 fetch하는 함수
    isFetching, //fetching 중인지>
  } = useInfiniteQuery(
    ['hotels'],
    // getNextPageParam의 return이 pageParam으로 넘어옴
    ({ pageParam }) => {
      return getHotels(pageParam)
    },
    {
      //getHotels의 return data가 snapshot으로 들어옴
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense: true,
    },
  )

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching === true) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const hotels = data?.pages.map(({ items }) => items).flat()

  return { data: hotels, loadMore, isFetching, hasNextPage }
}

export default useHotels
