import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { TransitionProps } from '../hooks/PropsType'

export interface TransitionPropsCom extends TransitionProps, StandardProps {
  children?: ReactNode
}

declare const Transition: ComponentClass<TransitionPropsCom>

export { Transition, TransitionProps }

