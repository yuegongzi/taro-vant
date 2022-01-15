import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface DropdownMenuProps extends StandardProps {
  activeColor?: string
  overlay?: boolean
  zIndex?: number
  duration?: number
  direction?: 'down' | 'up'
  closeOnClickOverlay?: boolean
  closeOnClickOutside?: boolean
  children: ReactNode
}
export interface DropdownItemProps extends StandardProps {
  value?: string | number
  title?: string
  disabled?: boolean
  titleClass?: string
  options: DropdownMenuOption[]
  popupStyle?: React.CSSProperties
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onChange?: (value?: number | string) => void
  children?: ReactNode | ReactNode[]
}
export type DropdownMenuOption = {
  text?: string
  value: number | string
  icon?: string
}
export type IDropdownItemInstance = {
  toggle: (visible?: boolean, options?: { immediate: boolean }) => void
}
