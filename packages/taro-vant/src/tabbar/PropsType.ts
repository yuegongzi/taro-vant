import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface TabbarProps extends StandardProps {
  active?: number
  activeColor?: string
  inactiveColor?: string
  fixed?: boolean
  placeholder?: boolean
  border?: boolean
  zIndex?: number
  safeAreaInsetBottom?: boolean
  children?: ReactNode
  onChange?: (event: { detail: string | number }) => void
}

declare const Tabbar: ComponentClass<TabbarProps>

export { Tabbar }

export interface TabbarItemProps extends Omit<StandardProps, 'onClick'> {
  badge?: string
  name?: string | number
  icon?: string
  dot?: boolean
  iconPrefix?: string
  renderIconActive?: ReactNode
  renderIcon?: ReactNode
  children?: ReactNode
  onClick?: (name: string | number) => void
}

declare const TabbarItem: ComponentClass<TabbarItemProps>

export { TabbarItem }
