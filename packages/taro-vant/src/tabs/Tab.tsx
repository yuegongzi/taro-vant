import './style/index.less'
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import type { TabProps } from './PropsType'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('tab')

function Tab(
  props: TabProps & {
    active: boolean
    lazyRender: boolean
    animated?: boolean
  },
) {
  const [ inited, setInited ] = useState(false)
  const {
    children,
    style,
    className,
    active,
    lazyRender,
    animated,
    ...others
  } = props
  useEffect(
    function() {
      setInited((pre) => pre || active)
    },
    [ active ],
  )

  return (
    <View
      className={clsx(bem('pane', {
        active,
        inactive: !active,
      }), className)}
      style={computedStyle([ active || animated ? '' : 'display: none;', style ])}
      {...others}
    >
      {(inited || !lazyRender) && children}
    </View>
  )
}

export default Tab
