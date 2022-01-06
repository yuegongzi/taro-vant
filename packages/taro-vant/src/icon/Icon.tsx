import './style/index.less'
import { Image, View } from '@tarojs/components'
import type { IconProps } from './PropsType'
import Info from '../info'
import { computedStyle, createNamespace } from '../utils'
import { isImage, rootClass, rootStyle } from './wxs'
import clsx from 'clsx'

const [ bem ] = createNamespace('icon')

export function Icon(props: IconProps) {
  const {
    classPrefix = 'van-icon',
    name,
    color,
    size,
    dot,
    info,
    style,
    className,
    spin,
    ...others
  } = props
  return (
    <View
      className={clsx( rootClass({
        classPrefix,
        name,
      }),className,{ [`${bem([ 'spin' ])}`]: spin })}
      style={computedStyle([
        rootStyle({
          color,
          size,
        }),
        style,
      ])}
      {...others}
    >
      {(info || info === 0 || dot) && (
        <Info dot={dot} info={info} className={clsx(bem('info'))} />
      )}
      {isImage(name) && (
        <Image src={name!} className={clsx(bem('image'))} mode='aspectFit' />
      )}
    </View>
  )
}

export default Icon
