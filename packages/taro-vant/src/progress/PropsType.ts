import type { StandardProps } from '@tarojs/components'

export interface ProgressProps extends StandardProps {
  inactive?: boolean
  percentage: number
  pivotText?: string
  pivotColor?: string
  trackColor?: string
  showPivot?: boolean
  color?: string
  textColor?: string
  strokeWidth?: number | string
}
