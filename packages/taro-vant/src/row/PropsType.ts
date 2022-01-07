import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface RowProps extends StandardProps {
  gutter?: number | string
  children: ReactNode
}

declare const Row: ComponentClass<RowProps>

export { Row }
