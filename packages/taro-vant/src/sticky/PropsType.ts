import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface StickyProps extends StandardProps {
  zIndex?: number
  offsetTop?: number
  disabled?: boolean
  container?: () => any
  scrollTop?: number
  children?: ReactNode
  onScroll?: (data: {
    detail: { scrollTop?: number; isFixed?: boolean }
  }) => any
}
