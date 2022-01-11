import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface IndexBarProps extends StandardProps {
  sticky?: boolean
  zIndex?: number
  highlightColor?: string
  stickyOffsetTop?: number
  indexList?: string[] | number[]
  onSelect?: (event: { detail: string | number }) => void
  children?: ReactNode
}
declare const IndexBar: ComponentClass<IndexBarProps>
export { IndexBar }
export interface IndexAnchorProps extends StandardProps {
  index: string | number
  children?: ReactNode
}
declare const IndexAnchor: ComponentClass<IndexAnchorProps>
export { IndexAnchor }
