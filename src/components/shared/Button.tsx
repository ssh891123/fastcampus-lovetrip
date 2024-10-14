import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import {
  ButtonColor,
  ButtonSize,
  buttonColorMap,
  buttonWeakMap,
  buttonSizeMap,
} from '@styles/button'

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.25;
          cursor: initial;
        `
      : undefined,
)

function ButtonGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Flex direction="column">
      {title != null ? (
        <>
          <Text typography="t6" bold={true}>
            {title}
          </Text>
          <Spacing size={8}></Spacing>
        </>
      ) : null}
      <Flex css={buttonGroupStyle}>{children}</Flex>
    </Flex>
  )
}

const buttonGroupStyle = css`
  flex-wrap: wrap;
  gap: 10px;
  & button {
    flex: 1;
  }
`

// ButtonGroup도 확장시키기 위함
const Button = BaseButton as typeof BaseButton & {
  ButtonGroup: typeof ButtonGroup
}

Button.ButtonGroup = ButtonGroup

export default Button
