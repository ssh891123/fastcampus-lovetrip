import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

function ReservationDonePage() {
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { hotelName: string }
  const navigate = useNavigate()

  return (
    <div>
      <Spacing size={80} />
      <Flex direction="column" align="center">
        <img
          src="https://cdn2.iconfinder.com/data/icons/valentine-day-16/512/548_fly_airplane_plane_airport_valentine_valentines_day_love-512.png"
          alt=""
          width={120}
          height={120}
        />
        <Spacing size={30} />
        <Text typography="t4" bold={true}>
          {hotelName}
        </Text>
        <Spacing size={8} />
        <Text>호텔이 완료되었습니다.</Text>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: 24 }}>
        <Button.ButtonGroup title="바로가기">
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/reservation/list')}>
            예약리스트
          </Button>
        </Button.ButtonGroup>
      </div>
    </div>
  )
}

export default ReservationDonePage
