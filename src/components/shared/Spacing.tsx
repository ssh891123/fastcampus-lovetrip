import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal'
}

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertival' }) =>
    direction === 'vertival'
      ? ` 
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}}
`

export default Spacing
