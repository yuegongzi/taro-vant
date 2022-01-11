import type { ComponentClass, ReactNode } from 'react'
import type { ButtonProps as TaroButtonProps } from '@tarojs/components'

export interface ButtonProps extends Omit<TaroButtonProps, 'size' | 'type'> {
  icon?: string
  classPrefix?: string
  type?: ButtonType
  size?: ButtonSize
  block?: boolean
  round?: boolean
  square?: boolean
  loading?: boolean
  hairline?: boolean
  disabled?: boolean
  loadingText?: string
  loadingSize?: string
  loadingType?: 'spinner' | 'circular'
  color?: string
  style?: string
  children?: ReactNode
}
export type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'normal' | 'large' | 'mini'
declare const Button: ComponentClass<ButtonProps>
export { Button }
