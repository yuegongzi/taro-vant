import type { ComponentClass, CSSProperties, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

/**
 * @title BadgeProps
 * @description 徽标属性
 */
export interface BadgeProps extends StandardProps {
  /**
   * @description 最大值，超过最大值会显示 `max+`，仅当 content 为数字时有效
   */
  max?: number | string
  /**
   * @description 是否展示为小红点
   * @default `false`
   */
  dot?: boolean
  /**
   * @description 徽标内容
   */
  content?: string | number
  /**
   * @description 徽标背景颜色
   */
  color?: string
  /**
   * @description 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为 px
   */
  offset?: (number | string)[]
  /**
   * @description 当 content 为数字 0 时，是否展示徽标
   * @default `true`
   */
  showZero?: boolean
  style?: CSSProperties | any
  children?: ReactNode
  className?: string
}

declare const Badge: ComponentClass<BadgeProps>

export { Badge }
