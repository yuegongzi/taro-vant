import type { ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

type params = {
  disabled: boolean
  checked: boolean
}
export interface RadioProps extends StandardProps {
  name?: string
  value?: any
  disabled?: boolean
  checkedColor?: string
  labelPosition?: string
  labelDisabled?: boolean
  shape?: 'round' | 'square'
  iconSize?: number | string
  children?: ReactNode
  iconRender?: ({ disabled, checked }: params) => ReactNode
  onChange?: (event: ITouchEvent) => any
}

export interface RadioGroupProps extends StandardProps {
  value?: any
  direction?: 'vertical' | 'horizontal'
  disabled?: boolean
  children?: ReactNode
  onChange?: (event: ITouchEvent) => any
}
