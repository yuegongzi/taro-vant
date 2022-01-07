import './style/index.less'
import { Image, View } from '@tarojs/components'
import type { EmptyProps } from './PropsType'
import { createNamespace } from '../utils'
import clsx from 'clsx'
import { imageUrl } from './wxs'

const [ bem ] = createNamespace('empty')

function Empty(props: EmptyProps) {
  const {
    image = 'default',
    description,
    renderImage,
    renderDescription,
    style,
    className,
    children,
    ...others
  } = props

  return (
    <View className={clsx(bem(), className)} style={style} {...others}>
      <View className={clsx(bem('image'))}>{renderImage}</View>
      <View className={clsx(bem('image'))}>
        {image && (
          <Image
            className={clsx(bem('image__img'))}
            src={imageUrl(image)}
          />
        )}
      </View>
      <View className={clsx(bem('description'))}>{renderDescription}</View>
      <View className={clsx(bem('description'))}>{description}</View>
      <View className={clsx(bem('bottom'))}>{children}</View>
    </View>
  )
}
Empty.displayName = 'Empty'
export default Empty
