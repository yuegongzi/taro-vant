import type { StandardProps } from '@tarojs/components'
import type { ReactNode } from 'react'

export interface PopoverItemProps extends StandardProps {
  text?: string
  icon?: ReactNode
  color?: string
  disabled?: boolean
}

export interface PopoverProps extends StandardProps {
  placement?: string
  actions?: PopoverItemProps[]
  theme?: 'light' | 'dark'
  duration?: number
  closeOnClickAction?: boolean
  closeOnClickOverlay?: boolean
  onOpen?: () => void
  onClose?: () => void
  onSelect?: (action: PopoverItemProps, index: number) => void
}
