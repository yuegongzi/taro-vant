import type { StandardProps } from '@tarojs/components'

export interface IconProps extends StandardProps {
  dot?: boolean
  badge?: number | string
  size?: number | string
  color?: string
  style?: string
  classPrefix?: string
  name?: string
  spin?: boolean
}
