import type { SwiperProps as TaroSwiperProps } from '@tarojs/components/types/Swiper'
import type { ReactNode } from 'react'

export interface SwiperProps extends TaroSwiperProps {
  inset?: boolean
  children: ReactNode
}
