import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface TransitionProps extends StandardProps {
  visible?: boolean
  duration?:
    | string
    | number
    | { enter: string | number; leave: string | number }
  name?: string
  onBeforeEnter?: () => void
  onBeforeLeave?: () => void
  onAfterEnter?: () => void
  onAfterLeave?: () => void
  onEnter?: () => void
  onLeave?: () => void
  enterClass?: string
  enterActiveClass?: string
  enterToClass?: string
  leaveClass?: string
  leaveActiveClass?: string
  leaveToClass?: string
  children?: ReactNode
}
