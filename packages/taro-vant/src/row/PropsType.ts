import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface RowProps extends StandardProps {
  gutter?: number | string
  children: ReactNode
}
