import type { StandardProps } from '@tarojs/components'

interface onChangeEvent {
  event: {
    detail?: number
  }
}
export interface SidebarProps extends StandardProps {
  onChange?: (a: onChangeEvent) => any
  activeKey: number
  children: React.ReactNode
}

export interface SidebarItemProps extends StandardProps {
  dot?: boolean
  badge?: string
  title?: string | React.ReactNode
  disabled?: boolean
  onClick?: (a: any) => void
  onChange?: (a: onChangeEvent) => void
  activeClass?: string
  disabledClass?: string
}
