import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getReviews, removeReview, writeReview } from '@remote/review'

import { Review } from '@models/review'
import useUser from '@hooks/auth/useUser'

function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const client = useQueryClient()

  const { data, isLoading } = useQuery(['review', hotelId], () =>
    getReviews({ hotelId }),
  )

  // mutateAsync는 promise를 반환해서 사용해서 흐름을 제어할 수 있음
  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        userId: user?.uid as string,
        hotelId,
        text,
        createAt: new Date(),
      }

      await writeReview(newReview)

      return true
    },
    {
      onSuccess: () => {
        //data를 갱신
        client.invalidateQueries(['review', hotelId])
      },
      onError: (e: Error) => {
        console.log('fail wrtie review')
      },
    },
  )

  const { mutateAsync: remove } = useMutation(
    ({ hotelId, reviewId }: { hotelId: string; reviewId: string }) => {
      return removeReview({ hotelId, reviewId })
    },
    {
      onSuccess: () => {
        //data를 갱신
        client.invalidateQueries(['review', hotelId])
      },
    },
  )

  return { data, isLoading, write, remove }
}

export default useReview
