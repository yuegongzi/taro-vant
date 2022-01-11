import type { ComponentClass } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface RateProps extends StandardProps {
  value?: number
  defaultValue?: number
  readonly?: boolean
  disabled?: boolean
  allowHalf?: boolean
  size?: string | number
  icon?: string
  voidIcon?: string
  color?: string
  voidColor?: string
  disabledColor?: string
  count?: number
  gutter?: string | number
  touchable?: boolean
  onChange?: (e: ITouchEvent) => any
}
declare const Rate: ComponentClass<RateProps>
export { Rate }
