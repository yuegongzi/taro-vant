import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface EmptyProps extends StandardProps {
  description?: string
  image?: 'error' | 'search' | 'default' | 'network' | string
  children?: ReactNode
}

declare const Empty: ComponentClass<EmptyProps>

export { Empty }
