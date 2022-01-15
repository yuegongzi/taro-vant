import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface ShareSheetOptionItem {
  name: string
  icon: string
  description?: string
  openType?: string
}
export interface ShareSheetOption {
  showBorder?: boolean
  options: ShareSheetOptionItem[]
  onSelect?: (option: ShareSheetOptionItem, index: number) => void
}
export interface ShareSheetProps extends StandardProps {
  visible?: boolean
  overlayStyle?: string
  zIndex?: number
  title?: string | ReactNode
  overlay?: boolean
  safeAreaInsetBottom?: boolean
  closeOnClickOverlay?: boolean
  duration?: number | string
  onClickOverlay?: () => void
  onCancel?: () => void
  onSelect?: (event: { detail: ShareSheetOptionItem }) => void
  onClose?: () => void
  cancelText?: string
  description?: string | ReactNode
  options?: ShareSheetOptionItem[] | ShareSheetOptionItem[][]
}
