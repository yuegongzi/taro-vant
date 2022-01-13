import type { SwiperProps } from './PropsType'
import { Swiper as TaroSwiper, SwiperItem } from '@tarojs/components'
import { createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('swiper')

function Swiper(props: SwiperProps) {
  const { style, children, className, inset, ...other } = props
  return (
    <TaroSwiper
      {...other}
      style={style}
      className={clsx(bem({ inset }), className)}
    >
      {children}
    </TaroSwiper>
  )
}

Swiper.Item = SwiperItem
Swiper.displayName = 'Swiper'
export default Swiper
