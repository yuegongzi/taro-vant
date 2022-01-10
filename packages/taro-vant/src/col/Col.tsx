
import { View } from '@tarojs/components'
import type { ColProps } from './PropsType'
import { rootStyle } from './wxs'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('col')

export function Col(props: ColProps): JSX.Element {
  const {
    span,
    offset,
    gutter = 14,
    children,
    className,
    style,
    ...others
  } = props

  return (
    <View
      className={clsx(bem([ span ]), offset ? `van-col--offset-${offset}` : '', className)}
      style={computedStyle([
        rootStyle({
          gutter,
        }),
        style,
      ])}
      {...others}
    >
      {children}
    </View>
  )
}

Col.displayName = 'Col'
export default Col
