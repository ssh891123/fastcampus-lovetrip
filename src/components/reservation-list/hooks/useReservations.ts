import useUser from '@hooks/auth/useUser'
import { getReservations } from '@remote/reservation'
import { useQuery } from 'react-query'

function useReservations() {
  const user = useUser()

  const { data, isLoading } = useQuery(
    ['reservations', user?.uid],
    () => getReservations({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  return { data, isLoading }
}

export default useReservations
