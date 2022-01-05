import type { ComponentClass, ReactNode } from 'react'
import type { ButtonProps } from '../button/PropsType'

export interface GoodsActionButtonProps extends Omit<ButtonProps, 'children'> {
  url?: string
  linkType?: 'navigateTo' | 'reLaunch' | 'redirectTo'
  text?: string
  children?: ReactNode
}

declare const GoodsActionButton: ComponentClass<GoodsActionButtonProps>

export { GoodsActionButton }
