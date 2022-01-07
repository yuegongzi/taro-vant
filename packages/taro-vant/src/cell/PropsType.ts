import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface CellProps extends StandardProps {
  url?: string
  linkType?: 'navigateTo' | 'reLaunch' | 'redirectTo'
  title?: string | number
  value?: string | number
  icon?: string
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
  renderTitle?: ReactNode
  renderIcon?: ReactNode
  renderLabel?: ReactNode
  renderRightIcon?: ReactNode
  renderExtra?: ReactNode
  children?: ReactNode | JSX.Element | JSX.Element[]
  valueClass?: string;
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
