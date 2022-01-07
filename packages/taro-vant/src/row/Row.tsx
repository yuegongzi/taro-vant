import './style/index.less'
import { View } from '@tarojs/components'
import type { RowProps } from './PropsType'
import { rootStyle } from './wxs'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('row')

function Row(props: RowProps): JSX.Element {
  const { gutter, children, className, style, ...others } = props

  return (
    <View
      className={clsx(bem(), className)}
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
Row.displayName ='Row'
export default Row
