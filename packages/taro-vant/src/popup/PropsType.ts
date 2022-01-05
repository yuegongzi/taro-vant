import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { TransitionProps } from '../mixins/PropsType'
import type { OverlayProps } from '../overlay/PropsType'

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
  position?: 'top' | 'bottom' | 'right' | 'left'
  safeAreaInsetBottom?: boolean
  safeAreaInsetTop?: boolean
  children?: ReactNode
  onClickOverlay?: () => void
  onClose?: () => void
}

declare const Popup: ComponentClass<PopupProps>

export { Popup }
