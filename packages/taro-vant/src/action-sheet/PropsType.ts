import type { ReactNode } from 'react'
import type {
  ButtonProps,
  ITouchEvent,
  StandardProps,
} from '@tarojs/components'
import type { PopupProps } from '../popup'

export interface ActionSheetProps extends StandardProps, PopupProps {
  actions?: ActionSheetItem[]
  title?: string
  visible?: boolean
  cancelText?: string
  description?: string
  overlay?: boolean
  closeOnClickOverlay?: boolean
  closeOnClickAction?: boolean
  safeAreaInsetBottom?: boolean
  round?: boolean
  zIndex?: number
  children?: ReactNode
  onSelect?: (event: ITouchEvent & { detail: ActionSheetItem }) => void
  onCancel?: () => void
  onClose?: () => void
  onClickOverlay?: () => void
}

export interface ActionSheetItem extends Omit<ButtonProps, 'children'> {
  name?: string
  subname?: string
  color?: string
  loading?: boolean
  disabled?: boolean
}
