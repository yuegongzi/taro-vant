import type { ComponentClass, ReactNode } from 'react'
import type { ButtonProps as TaroButtonProps } from '@tarojs/components'

export interface ButtonProps extends Omit<TaroButtonProps, 'size' | 'type'> {
  /**
   * @description 图标
   */
  icon?: string
  /**
   * @description  图标类名前缀，同 Icon 组件的 [class-prefix](#/icon) 属性
   * @default `van-icon`
   */
  classPrefix?: string
  /**
   * @description 按钮类型, 可选值为 `primary` `info` `warning` `danger`
   * @default `default`
   */
  type?: ButtonType
  /**
   * @description 按钮尺寸，可选值为 `normal` `large` `small` `mini`
   * @default `normal`
   */
  size?: ButtonSize
  /**
   * @description 是否为块级元素
   * @default `false`
   */
  block?: boolean
  /**
   * @description 是否为圆形按钮
   * @default `false`
   */
  round?: boolean
  /**
   * @description 是否为方形按钮
   * @default `false`
   */
  square?: boolean
  /**
   * @description 是否显示为加载状态
   * @default `false`
   */
  loading?: boolean
  /**
   * @description 是否使用 0.5px 边框
   * @default `false`
   */
  hairline?: boolean
  /**
   * @description 是否禁用按钮
   * @default `false`
   */
  disabled?: boolean
  /**
   * @description 加载状态提示文字
   */
  loadingText?: string
  /**
   * @description 加载图标大小
   * @default `40px`
   */
  loadingSize?: string
  /**
   * @description 加载状态图标类型
   */
  loadingType?: 'spinner' | 'circular'
  /**
   * @description 按钮颜色，支持传入`linear-gradient`渐变色
   */
  color?: string
  style?: string
  children?: ReactNode
}

export type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'normal' | 'large' | 'mini'
declare const Button: ComponentClass<ButtonProps>

export { Button }
