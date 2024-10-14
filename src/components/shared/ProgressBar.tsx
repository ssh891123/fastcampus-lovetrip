import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'

const BaseProcessBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`,
  transition: 'transform 0.3s',
  transformOrigin: 'left',
}))

const Container = styled.div(() => ({
  width: '100%',
  height: 10,
  backgroundColor: colors.gray,
  overflow: 'hidden', //ProgressBar가 넘쳤을때 잘락버림
  borderRadius: 6,
}))

function ProgressBar({ progress }: { progress: number }) {
  return (
    <Container>
      <BaseProcessBar progress={progress} />
    </Container>
  )
}

export default ProgressBar
