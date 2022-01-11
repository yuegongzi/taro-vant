import { Text, View } from '@tarojs/components'
import React from 'react'
import type { IndexAnchorProps } from './PropsType'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('index-anchor')

function IndexAnchor(
  props: IndexAnchorProps & {
    anchorStyle: React.CSSProperties
    wrapperStyle: React.CSSProperties
    active: boolean
  },
) {
  const {
    wrapperStyle,
    active,
    anchorStyle,
    index,
    children,
    style,
    className,
    ...others
  } = props
  return (
    <View
      className={clsx(bem('wrapper', className))}
      style={computedStyle([ wrapperStyle, style ])}
      {...others}
    >
      <View
        className={clsx(
          bem({
            active,
            bottom: active,
          }),
        )}
        style={anchorStyle}
      >
        {children ? (
          <>{children}</>
        ) : (
          <>
            <Text>{index}</Text>
          </>
        )}
      </View>
    </View>
  )
}

IndexAnchor.displayName = 'IndexAnchor'
export default IndexAnchor
