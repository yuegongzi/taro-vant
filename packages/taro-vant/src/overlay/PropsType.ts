import type { StandardProps } from '@tarojs/components'
import type { ComponentClass, ReactNode } from 'react'

export interface OverlayProps extends StandardProps {
  visible?: boolean
  lockScroll?: boolean
  zIndex?: string | number
  duration?:
    | string
    | number
    | { enter: string | number; leave: string | number }
  children?: ReactNode
}
declare const Overlay: ComponentClass<OverlayProps>
export { Overlay }
