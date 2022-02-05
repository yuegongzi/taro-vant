import type { StandardProps } from '@tarojs/components'
import type { ReactNode } from 'react'

type Direction = 'right' | 'left'

type Position = {
  top?: string
  bottom?: string
}

export type PinNavItem = {
  text?: string
  icon?: string | ReactNode
  badge?: number | string
  url: string
  linkType: 'navigateTo' | 'reLaunch' | 'redirectTo'
}

export interface PinNavProps extends StandardProps {
  visible?: boolean
  overlay?: boolean
  navList?: PinNavItem[]
  activeText?: string
  unActiveText?: string
  position?: Position
  type?: Direction
  icon?: string
  onChange?: (v: any) => void
  onSelect?: (v: any) => void
}
