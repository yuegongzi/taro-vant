import './style/index.less';
import { View, Block } from '@tarojs/components'
import * as utils from '../wxs/utils'
import type { CellGroupProps } from './PropsType'

export function CellGroup(props: CellGroupProps) {
  const {
    inset,
    title,
    border = true,
    children,
    style,
    className,
    ...others
  } = props

  return (
    <Block>
      {title && (
        <View
          className={utils.bem('cell-group__title', {
            inset,
          })}
        >
          {title}
        </View>
      )}
      <View
        className={
          ' ' +
          utils.bem('cell-group', {
            inset,
          }) +
          ' ' +
          (border ? 'van-hairline--top-bottom' : '') +
          ` ${className || ''}`
        }
        style={style}
        {...others}
      >
        {children}
      </View>
    </Block>
  )
}
export default CellGroup
