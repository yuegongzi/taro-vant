import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

type eventDetail = {
  detail: { index: number; name?: string; title?: string }
}

export interface TabsProps extends Omit<StandardProps, 'onClick'> {
  sticky?: boolean
  border?: boolean
  swipeable?: boolean
  titleActiveColor?: string
  titleInactiveColor?: string
  color?: string
  animated?: boolean
  lineWidth?: number | string
  lineHeight?: number | string
  active?: number | string
  type?: string
  ellipsis?: boolean
  duration?: number
  zIndex?: number
  swipeThreshold?: number
  offsetTop?: number
  lazyRender?: boolean
  children: ReactNode
  renderNavLeft?: ReactNode
  renderNavRight?: ReactNode
  onScroll?: (data: {
    detail: { scrollTop?: number | null; isFixed?: boolean }
  }) => void
  onClick?: (event: eventDetail) => void
  onChange?: (event: eventDetail) => void
  onDisabled?: (event: eventDetail) => void
  tabClass?: string;
  tabActiveClass?: string;
}

declare const Tabs: ComponentClass<TabsProps>

export { Tabs }

export interface TabProps extends StandardProps {
  dot?: boolean
  badge?: string | number
  title?: string
  disabled?: boolean
  titleStyle?: string
  name?: string | number
  children: ReactNode
}

declare const Tab: ComponentClass<TabProps>

export { Tab }
