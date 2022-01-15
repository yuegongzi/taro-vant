import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface EmptyProps extends StandardProps {
  description?: string
  image?: 'error' | 'search' | 'default' | 'network' | string
  children?: ReactNode
}
