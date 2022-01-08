import type { ComponentClass, CSSProperties, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'


export interface BadgeProps extends StandardProps {

  max?: number | string

  dot?: boolean

  content?: string | number

  color?: string

  offset?: (number | string)[]

  showZero?: boolean
  style?: CSSProperties | any
  children?: ReactNode
  className?: string
}

declare const Badge: ComponentClass<BadgeProps>

export { Badge }
