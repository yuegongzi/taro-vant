import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface GoodsActionProps extends StandardProps {
  safeAreaInsetBottom?: boolean
  children: ReactNode
}

declare const GoodsAction: ComponentClass<GoodsActionProps>

export { GoodsAction }
