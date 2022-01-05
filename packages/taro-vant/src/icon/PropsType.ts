import type { ComponentClass } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface IconProps extends StandardProps {
  dot?: boolean
  info?: number | string
  size?: number | string
  color?: string
  style?: string
  classPrefix?: string
  name?: string
}

declare const Icon: ComponentClass<IconProps>

export { Icon }