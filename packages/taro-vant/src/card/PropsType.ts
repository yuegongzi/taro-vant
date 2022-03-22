import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { ImageProps } from '@tarojs/components/types/Image.d'

export interface CardProps extends StandardProps {
  tag?: string | ReactNode
  num?: string
  desc?: string | ReactNode
  thumb?: string | ReactNode
  title?: ReactNode
  price: string | number
  centered?: boolean
  lazyLoad?: boolean
  thumbLink?: string
  originPrice?: string
  thumbMode?: keyof ImageProps.Mode
  currency?: string
  footer?: ReactNode
  bottom?: ReactNode
  priceTop?: ReactNode
  tags?: ReactNode
}
