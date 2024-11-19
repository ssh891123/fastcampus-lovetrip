import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import useHotels from '@components/hotelList/hooks/useHotels'

import HotelItem from '@components/hotelList/HotelItem'
import Spacing from '@shared/Spacing'
import Top from '@shared/Top'
import withSuspense from '@shared/hocs/withSuspense'

import useLike from '@hooks/like/useLike'

function HotelList() {
  const { data: hotels, hasNextPage, loadMore } = useHotels()
  const { data: likes, mutate: like } = useLike()

  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가" />
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem
                hotel={hotel}
                //find는 객체를 반환하므로 boolean타입을 전달하기 위함
                isLike={Boolean(
                  likes?.find((like) => hotel.id === like.hotelId),
                )}
                onLike={like}
              />
              {idx === hotels.length - 1 ? null : (
                <Spacing
                  size={8}
                  backgroundColor="gray100"
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default withSuspense(HotelList, {
  fallback: <div>호텔목록을 가져오고 있습니다..</div>,
})
