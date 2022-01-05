import './style/index.less'
import { View } from '@tarojs/components'
import type { DividerProps } from './PropsType'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'
import { rootStyle } from './wxs'

const [ bem ] = createNamespace('divider')

export function Divider(props: DividerProps) {
  const {
    dashed = false,
    hairline = false,
    contentPosition,
    borderColor,
    textColor,
    fontSize,
    style,
    className,
    children,
    ...others
  } = props

  return (
    <View
      className={clsx(bem([
        {
          dashed,
          hairline,
        },
        contentPosition,
      ]), className)}
      style={computedStyle([
        rootStyle({
          borderColor,
          textColor,
          fontSize,
        }),
        style,
      ])}
      {...others}
    >
      {children}
    </View>
  )
}

export default Divider
