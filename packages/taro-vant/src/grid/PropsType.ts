import type { ComponentClass } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface GridProps extends StandardProps {
  square?: boolean
  gutter?: number | string
  clickable?: boolean
  columnNum?: number
  center?: boolean
  border?: boolean
  direction?: string
  iconSize?: string | number
  reverse?: boolean
  children?: React.ReactNode
}

declare const Grid: ComponentClass<GridProps>

export { Grid }

export interface GridItemProps extends StandardProps {
  icon?: string
  iconColor?: string
  iconPrefix?: string
  dot?: boolean
  badge?: string | number | undefined
  text?: string
  url?: string
  linkType?: 'navigateTo' | 'reLaunch' | 'redirectTo'
  children?: React.ReactNode
}

declare const GridItem: ComponentClass<GridItemProps>

export { GridItem }
