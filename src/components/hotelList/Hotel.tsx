import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { Hotel as IHotel } from '@models/hotel'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Tag from '@shared/Tag'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

import addDelimeter from '@utils/addDelimeter'
import formatTime from '@utils/formatTime'

// interface임을 명시하기 위해 I라는 prefix붙임
function Hotel({ hotel }: { hotel: IHotel }) {
  const [remainedTime, setRemainedTime] = useState(0)

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return
    }

    const promoEndTime = hotel.events.promoEndTime

    const timer = setInterval(() => {
      //parseISO -> string 데이터를 Date 객체로 변환
      //promoEndTime과 현재시간(new Date)의 차이를 반환
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date('2023-10-17T03:24:00'),
      )

      if (남은초 < 0) {
        clearInterval(timer)
        return
      }

      setRemainedTime(남은초)
    }, 1_000)

    return () => {
      clearInterval(timer)
    }
  }, [hotel.events])

  const tagComponent = () => {
    if (hotel.events == null) {
      return null
    }

    const { name, tagThemeStyle } = hotel.events

    const promotionText =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionText)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }

  return (
    <Link to={`/hotel/${hotel.id}`}>
      <div>
        <ListRow
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Texts
                title={hotel.name}
                subTitle={hotel.comment}
              ></ListRow.Texts>
              <Spacing size={4} />
              <Text typography="t7" color="gray600">
                {hotel.starRating}성급
              </Text>
            </Flex>
          }
          right={
            <Flex direction="column" align="flex-end">
              <img src={hotel.mainImageUrl} alt="" css={imageStyle} />
              <Spacing size={8} />
              <Text bold={true}>{addDelimeter(hotel.price)}원</Text>
            </Flex>
          }
          style={containerStyles}
        />
      </div>
    </Link>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

const imageStyle = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`

export default Hotel
