import type { ComponentClass } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface ColProps extends StandardProps {
  span: number | string
  offset?: number | string
  gutter?: number | string
  children: React.ReactNode
}
declare const Col: ComponentClass<ColProps>
export { Col }
