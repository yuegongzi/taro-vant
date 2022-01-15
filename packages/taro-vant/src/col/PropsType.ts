import type { StandardProps } from '@tarojs/components'

export interface ColProps extends StandardProps {
  span: number | string
  offset?: number | string
  gutter?: number | string
  children: React.ReactNode
}
