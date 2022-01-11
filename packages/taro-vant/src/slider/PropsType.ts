import type { ComponentClass, ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

type SliderEvent = {
  detail: {
    value: number
  }
}
export interface SliderProps extends StandardProps {
  range?: boolean
  disabled?: boolean
  activeColor?: string
  inactiveColor?: string
  max?: number
  min?: number
  step?: number
  value?: number
  barHeight?: number | string
  vertical?: boolean
  onDrag?: (e: ITouchEvent & SliderEvent) => void
  onChange?: (e: ITouchEvent & SliderEvent) => void
  onDragStart?: () => void
  onDragEnd?: () => void
  leftButton?: (value: number) => ReactNode
  rightButton?: (value: number) => ReactNode
  button?: (value: number) => ReactNode
}
declare const Slider: ComponentClass<SliderProps>
export { Slider }
