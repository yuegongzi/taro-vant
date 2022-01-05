import type { ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface CheckboxProps extends StandardProps {
  name?: string
  value?: boolean
  disabled?: boolean
  checkedColor?: string
  labelPosition?: string
  labelDisabled?: boolean
  shape?: 'round' | 'square'
  iconSize?: string | number
  children?: ReactNode
  renderIcon?: ReactNode
  onChange?: (event: ITouchEvent) => any
}

export interface CheckboxGroupProps extends StandardProps {
  max?: number
  value?: any[]
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
  children?: ReactNode[]
  onChange?: (event: ITouchEvent) => any
}

