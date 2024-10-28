import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'
import { getLikes, toggleLike } from '@remote/like'
import { Hotel } from '@models/hotel'
import { useAlertContext } from '@contexts/AlertContext'

function useLike() {
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const client = useQueryClient()

  const { data } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: user != null, //user 정보가 있을때만 호출함
    },
  )

  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, 'id' | 'name' | 'mainImageUrl'> }) => {
      if (user == null) {
        throw new Error('로그인필요')
      }

      return toggleLike({ hotel, userId: user?.uid })
    },
    {
      onSuccess: () => {
        // data업데이트가 되면 cache된 data를 업데이트
        client.invalidateQueries(['likes'])
      },
      //에러를 처리하는 콜백
      onError: (e: Error) => {
        if (e.message === '로그인필요') {
          open({
            title: '로그인이 필요한 기능 입니다',
            onButtonClick: () => {
              navigate('/signin')
            },
          })

          return
        }

        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해 주세요',
          onButtonClick: () => {
            // 다른 액션 필요
          },
        })
      },
    },
  )

  return { data, mutate }
}

export default useLike
