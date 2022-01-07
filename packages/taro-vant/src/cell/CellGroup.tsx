import './style/index.less'
import { Block, View } from '@tarojs/components'
import type { CellGroupProps } from './PropsType'
import { createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('cell-group')

function CellGroup(props: CellGroupProps) {
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
          className={clsx(bem('title', {
            inset,
          }))}
        >
          {title}
        </View>
      )}
      <View
        className={clsx(bem({ inset }), {
          ['van-hairline--top-bottom']: border,
        }, className)}
        style={style}
        {...others}
      >
        {children}
      </View>
    </Block>
  )
}

export default CellGroup
