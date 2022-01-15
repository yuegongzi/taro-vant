import type { ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface CollapseProps extends StandardProps {
  value?: (string | number)[]
  accordion?: boolean
  border?: boolean
  children?: ReactNode[]
  onChange?: (event: ITouchEvent) => any
  onOpen?: (event: ITouchEvent) => any
  onClose?: (event: ITouchEvent) => any
}

export interface CollapseItemProps extends StandardProps {
  name?: string | number
  title?: ReactNode
  value?: ReactNode
  icon?: string
  label?: string
  disabled?: boolean
  clickable?: boolean
  border?: boolean
  isLink?: boolean
  children?: ReactNode
  rightIcon?: ReactNode
}
