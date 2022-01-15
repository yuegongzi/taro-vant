import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface DividerProps extends StandardProps {
  dashed?: boolean
  hairline?: boolean
  contentPosition?: 'left' | 'center' | 'right'
  fontSize?: string
  borderColor?: string
  textColor?: string
  children?: ReactNode
}
