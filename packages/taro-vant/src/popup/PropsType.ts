import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { TransitionProps } from '../transition'
import type { OverlayProps } from '../overlay'

export interface PopupProps
  extends TransitionProps,
    StandardProps,
    OverlayProps {
  round?: boolean
  closeable?: boolean
  overlayStyle?: string
  transition?: string
  zIndex?: number
  overlay?: boolean
  closeIcon?: string
  closeIconPosition?: string
  closeOnClickOverlay?: boolean
  position?: 'top' | 'bottom' | 'right' | 'left' | 'center'
  safeAreaInsetBottom?: boolean
  safeAreaInsetTop?: boolean
  children?: ReactNode
  onClickOverlay?: () => void
  onClose?: () => void
}
