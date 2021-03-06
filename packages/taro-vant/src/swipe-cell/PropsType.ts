import type { ITouchEvent, StandardProps } from '@tarojs/components'

type SwipeCellClick = {
  detail: {
    position: 'left' | 'right' | 'cell' | 'outside'
  }
}
type SwipeCellOpen = {
  detail: {
    position: 'left' | 'right'
    name: string
  }
}
type SwipeCellClose = {
  detail: {
    position: 'left' | 'right'
    name: string
  }
}
export interface SwipeCellProps extends StandardProps {
  disabled?: boolean
  leftWidth?: number
  rightWidth?: number
  asyncClose?: boolean
  name?: string | number
  catchMove?: boolean
  wrapperStyle?: React.CSSProperties
  onOpen?: (e: ITouchEvent & SwipeCellOpen) => void
  onClick?: (e: ITouchEvent & SwipeCellClick) => void
  onClose?: (e: ITouchEvent & SwipeCellClose) => void
  left?: React.ReactNode
  right?: React.ReactNode
  children?: React.ReactNode
}
export type ISwiperCellInstance = {
  open: (position: 'left' | 'right') => void
  close: () => void
}
