import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface CellProps extends StandardProps {
  url?: string
  linkType?: 'navigateTo' | 'reLaunch' | 'redirectTo'
  title?: ReactNode
  value?: ReactNode
  icon?: string | ReactNode
  size?: 'large'
  label?: string
  center?: boolean
  isLink?: boolean
  required?: boolean
  clickable?: boolean
  titleWidth?: string
  style?: string
  arrowDirection?: 'left' | 'up' | 'down'
  border?: boolean
  titleStyle?: string
  rightIcon?: ReactNode
  extra?: ReactNode
  children?: ReactNode | JSX.Element | JSX.Element[]
  valueClass?: string
  titleClass?: string
}
export interface CellGroupProps extends StandardProps {
  title?: string
  border?: boolean
  inset?: boolean
  children?: ReactNode
}
declare const CellGroup: ComponentClass<CellGroupProps>
export { CellGroup }
declare const Cell: ComponentClass<CellProps>
export { Cell }
