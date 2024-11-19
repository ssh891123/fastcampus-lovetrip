import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Tag from '@shared/Tag'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import withSuspense from '@shared/hocs/withSuspense'

import useRooms from './hook/useRooms'
import addDelimeter from '@utils/addDelimeter'

import useUser from '@hooks/auth/useUser'
import { useAlertContext } from '@contexts/AlertContext'

function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms(hotelId)
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()

  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text bold={true} typography="t4">
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금 포함
        </Text>
      </Header>
      <ul>
        {data?.map((room) => {
          const 마감임박인가 = room.avaliableCount === 1
          const 매진인가 = room.avaliableCount === 0

          const params = qs.stringify(
            {
              roomId: room.id,
              hotelId,
            },
            { addQueryPrefix: true },
          )

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName}의 객실 이미지`}
                  css={imageStyle}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {마감임박인가 === true ? (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimeter(room.price)}원`.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                />
              }
              right={
                <Button
                  size="medium"
                  disabled={매진인가}
                  onClick={() => {
                    if (user == null) {
                      //로그인 전
                      open({
                        title: '로그인이 필요한 기능 입니다.',
                        onButtonClick: () => {
                          navigate('/lsignin')
                        },
                      })

                      return
                    }

                    navigate(`/schedule${params}`)
                  }}
                >
                  {매진인가 === true ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: 40px 0;
`

const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyle = css`
  width: 80px;
  height: 80px;
  object-fit: colver;
  border-radius: 4px;
`

export default withSuspense(Rooms, {
  fallback: <div>룸 정보를 가져오는 중...</div>,
})
