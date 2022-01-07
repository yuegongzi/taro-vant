import './style/index.less'
import { Image, View } from '@tarojs/components'
import type { IconProps } from './PropsType'
import Badge from '../badge'
import { computedStyle, createNamespace, isAnyBlank } from '../utils'
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
    badge,
    style,
    className,
    spin,
    ...others
  } = props

  const renderIcon = () => {
    return (
      <View
        className={clsx(rootClass({
          classPrefix,
          name,
        }), className, { [`${bem([ 'spin' ])}`]: spin })}
        style={computedStyle([
          rootStyle({
            color,
            size,
          }),
          style,
        ])}
        {...others}
      >
        {isImage(name) && (
          <Image src={name!} className={clsx(bem('image'))} mode='aspectFit' />
        )}
      </View>
    )
  }
  if ((!isAnyBlank(badge) || dot)) {
    return (
      <Badge dot={dot} content={badge} className={clsx(bem('badge'))}>
        {renderIcon()}
      </Badge>
    )
  }
  return renderIcon()
}

export default Icon
