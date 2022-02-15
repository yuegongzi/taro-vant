import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface CircleProps extends StandardProps {
  text?: string
  lineCap?: string
  value?: number
  speed?: number
  size?: number
  fill?: string
  layerColor?: string
  color?: string | Record<string, string>
  strokeWidth?: number
  clockwise?: boolean
  children?: ReactNode
}
