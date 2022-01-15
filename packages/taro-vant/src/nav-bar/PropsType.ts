import type { ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface NavBarProps extends StandardProps {
  title?: string | ReactNode
  fixed?: boolean
  placeholder?: boolean
  leftText?: string | ReactNode
  rightText?: string | ReactNode
  style?: string
  leftArrow?: boolean
  border?: boolean
  zIndex?: number
  safeAreaInsetTop?: boolean
  onClickLeft?: (e: ITouchEvent) => void
  onClickRight?: (e: ITouchEvent) => void
}
export interface MiniNavBarProps extends StandardProps {
  homeUrl: string
  buttonColor?: 'white' | 'black'
  title?: string | ReactNode
  fixed?: boolean
  placeholder?: boolean
  style?: string
  border?: boolean
  zIndex?: number
}
