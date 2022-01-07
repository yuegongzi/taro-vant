import './style/index.less'
import { View } from '@tarojs/components'
import type { TagProps } from './PropsType'
import Icon from '../icon'
import * as computed from './wxs'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('tag')

export function Tag(props: TagProps) {
  const {
    type = 'default',
    size,
    mark,
    plain,
    round,
    color,
    textColor,
    closeable,
    children,
    onClose,
    style,
    className,
    ...others
  } = props

  return (
    <View
      className={clsx(bem([
        type,
        size,
        {
          mark,
          plain,
          round,
        },
      ]), className)}
      style={computedStyle([
        computed.rootStyle({
          plain,
          color,
          textColor,
        }),
        style,
      ])}
      {...others}
    >
      {children}
      {closeable && (
        <Icon name='cross' className={clsx(bem('close'))} onClick={onClose} />
      )}
    </View>
  )
}

export default Tag
