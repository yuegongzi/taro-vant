import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { ButtonProps } from '../button'

export interface GoodsActionProps extends StandardProps {
  safeAreaInsetBottom?: boolean
  children: ReactNode
}

declare const GoodsAction: ComponentClass<GoodsActionProps>

export { GoodsAction }


export interface GoodsActionButtonProps extends Omit<ButtonProps, 'children'> {
  url?: string
  linkType?: 'navigateTo' | 'reLaunch' | 'redirectTo'
  text?: string
  children?: ReactNode
}

declare const GoodsActionButton: ComponentClass<GoodsActionButtonProps>

export { GoodsActionButton }


export interface GoodsActionIconProps
  extends Omit<ButtonProps, 'square' | 'children'> {
  url?: string
  linkType?: 'navigateTo' | 'reLaunch' | 'redirectTo'
  text?: string
  dot?: boolean
  badge?: string
  icon?: string
  children?: ReactNode
}

declare const GoodsActionIcon: ComponentClass<GoodsActionIconProps>

export { GoodsActionIcon }

