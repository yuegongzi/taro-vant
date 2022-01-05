import type { ComponentClass } from 'react'
import type { StandardProps } from '@tarojs/components'
import notify from './notify'

export interface NotifyProps extends StandardProps {
  selector?: string
  message?: string
  background?: string
  type?: string
  color?: string
  duration?: number
  zIndex?: number
  safeAreaInsetTop?: boolean
  top?: number
  id?: string
  onClick?: (data: any) => void
  onOpened?: () => void
  onClose?: () => void
}

interface notifyProps {
  show: (options: NotifyProps | string) => any
  clear: (options?: NotifyProps) => any
}

declare const Notify: ComponentClass<NotifyProps> & notifyProps

export { Notify, notify }