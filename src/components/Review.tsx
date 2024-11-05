import { ChangeEvent, useCallback, useState } from 'react'
import { format } from 'date-fns'

import useReview from '@components/hotel/hook/useReview'
import useUser from '@hooks/auth/useUser'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import TextField from '@shared/TextField'

function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading, write, remove } = useReview({ hotelId })
  const user = useUser()
  const [text, setText] = useState('')

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/message_open-64.png"
            alt=""
          />
          <Spacing size={10} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요 !
          </Text>
        </Flex>
      )
    }

    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user.photoURL != null ? (
                <img src={review.user.photoURL} alt="" width={40} height={40} />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createAt, 'yyyy-MM-dd')}
              />
            }
            right={
              review.userId === user?.uid ? (
                <Button
                  onClick={async () => {
                    await remove({
                      hotelId: review.hotelId,
                      reviewId: review.id,
                    })
                  }}
                >
                  삭제
                </Button>
              ) : null
            }
          />
        ))}
      </ul>
    )
  }, [reviews, user])

  const handleText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user != null ? (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleText} />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button
              disabled={text.length === 0}
              onClick={async () => {
                const success = await write(text)
                if (success) {
                  setText('')
                }
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}

export default Review