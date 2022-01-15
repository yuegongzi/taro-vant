import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface ToastProps extends StandardProps {
  zIndex?: number
  duration?: number
  mask?: boolean
  forbidClick?: boolean
  type?: 'loading' | 'success' | 'fail' | 'html' | 'text'
  position?: 'top' | 'middle' | 'bottom'
  message?: string | ReactNode
  loadingType?: 'circular' | 'spinner' | undefined
  selector?: string
  id?: string
  children?: ReactNode
  onClose?: () => any
}
