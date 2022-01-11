import { Block, View } from '@tarojs/components'
import { useState } from 'react'
import type { LoadingProps } from './PropsType'
import { spinnerStyle, textStyle } from './wxs'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('loading')

export function Loading(props: LoadingProps): JSX.Element {
  const {
    vertical,
    type = 'circular',
    color,
    size,
    textSize,
    className,
    children,
    style,
    ...others
  } = props

  const [ array12 ] = useState(Array.from({ length: 12 }))

  return (
    <View
      className={clsx(bem({ vertical }), className)}
      style={computedStyle([ style ])}
      {...others}
    >
      <View
        className={clsx(bem('spinner', [ type ]))}
        style={spinnerStyle({
          color,
          size,
        })}
      >
        {type === 'spinner' && (
          <Block>
            {array12.map((_, index: number) => {
              return (
                <View
                  key={`van-loading__dot_${index}`}
                  className={clsx(bem('dot'))}
                />
              )
            })}
          </Block>
        )}
        {type === 'ball' && (
          <View className={clsx(bem('ball'))}>
            <View />
            <View />
            <View />
          </View>
        )}
      </View>
      <View
        className={clsx(bem('text'))}
        style={textStyle({
          textSize,
        })}
      >
        {children}
      </View>
    </View>
  )
}

Loading.displayName = 'Loading'
export default Loading
