import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import toast from './toast-func'

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
interface toastProps {
  show: (options: ToastProps | string) => any
  loading: (options: ToastProps | string) => any
  success: (options: ToastProps | string) => any
  fail: (options: ToastProps | string) => any
  clear: (options?: ToastProps) => void
  setDefaultOptions: (options: ToastProps) => void
  resetDefaultOptions: (options: any) => void
}
declare const Toast: ComponentClass<ToastProps> & toastProps
export { Toast, toast }
