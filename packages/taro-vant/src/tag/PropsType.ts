import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface TagProps extends StandardProps {
  size?: 'large' | 'medium'
  mark?: boolean
  color?: string
  plain?: boolean
  round?: boolean
  textColor?: string
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning'
  closeable?: boolean
  children?: ReactNode
  onClose?: (e: any) => void
}
