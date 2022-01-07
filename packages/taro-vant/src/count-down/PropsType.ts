import type { ForwardRefRenderFunction } from 'react'
import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface ICountDownRef {
  start: () => void
  pause: () => void
  reset: () => void
}

export interface ITimeData {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export interface CountDownProps extends StandardProps {
  millisecond?: boolean
  time?: number
  format?: string
  autoStart?: boolean
  children?: ReactNode
  onChange?: (timeData: { detail: ITimeData }) => void
  onFinish?: () => void
  ref?: React.MutableRefObject<ICountDownRef | undefined>
}

declare const CountDown: ForwardRefRenderFunction<ICountDownRef, CountDownProps>

export { CountDown }
