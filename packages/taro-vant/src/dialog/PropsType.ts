import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { ButtonProps } from '../button'
import type { PopupProps } from '../popup'

export interface DialogProps
  extends StandardProps,
    Omit<PopupProps, 'onClose'>,
    Omit<ButtonProps, 'children'> {
  visible?: boolean
  title?: string | ReactNode
  width?: string | number
  zIndex?: number
  theme?: 'round-button'
  cancelButtonColor?: string
  confirmButtonColor?: string
  onConfirm?: (event: {
    detail: { action: string; dialog?: { dialog: any } }
  }) => void
  onCancel?: (event: {
    detail: { action: string; dialog?: { dialog: any } }
  }) => void
  onClose?: (event: { detail: string }) => void
  message?: string
  overlay?: boolean
  selector?: string
  className?: string
  style?: string
  transition?: 'fade' | 'none'
  beforeClose?: (action: string) => Promise<void | boolean> | void | boolean
  messageAlign?: 'left' | 'right'
  confirmButtonText?: string
  cancelButtonText?: string
  showConfirmButton?: boolean
  showCancelButton?: boolean
  closeOnClickOverlay?: boolean
  cancelButtonProps?: Record<any, any>
  confirmButtonProps?: Record<any, any>
}

export interface dialog {
  alert: (options: DialogProps) => Promise<void>
  confirm: (options: DialogProps) => Promise<void>
  setDefaultOptions: (options: DialogProps) => void
  resetDefaultOptions: () => void
  close: () => void
  stopLoading: () => void
}
// & DialogCom
