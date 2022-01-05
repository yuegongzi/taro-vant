import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface IndexAnchorProps extends StandardProps {
  index: string | number
  children?: ReactNode
}

declare const IndexAnchor: ComponentClass<IndexAnchorProps>
export { IndexAnchor }
