import { Typography, typographyMap } from '@styles/typography'
import { Colors, colors } from '@/styles/colorPalette'
import { CSSProperties } from 'react'

import styles from '@emotion/styled'

interface TextProp {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styles.span<TextProp>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color], // var(--red)
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
