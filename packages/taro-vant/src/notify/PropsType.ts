import type { StandardProps } from '@tarojs/components'

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
