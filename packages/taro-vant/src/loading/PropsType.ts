import type { StandardProps } from '@tarojs/components'

export interface LoadingProps extends StandardProps {
  color?: string
  vertical?: boolean
  type?: 'spinner' | 'circular' | 'ball'
  size?: string | number
  textSize?: string | number
  children?: React.ReactNode
}
