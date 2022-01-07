import './style/index.less'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import type { SkeletonProps } from './PropsType'
import { createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('skeleton')

function Skeleton(props: SkeletonProps) {
  const [ state, setState ] = useState({
    isArray: false,
    rowArray: [],
  })
  const { isArray, rowArray } = state
  const {
    row = 0,
    animate = true,
    avatar,
    avatarShape = 'round',
    avatarSize = Taro.pxTransform(64),
    titleWidth = '40%',
    title,
    rowWidth = '100%',
    loading = true,
    children,
    style,
    className,
    ...others
  } = props

  useEffect(
    function() {
      setState((pre: any) => {
        return { ...pre, rowArray: Array.from({ length: row }) }
      })
    },
    [ row ],
  )

  useEffect(
    function() {
      setState((pre: any) => {
        return { ...pre, isArray: (rowWidth as any) instanceof Array }
      })
    },
    [ rowWidth ],
  )

  return loading ? (
    <View
      className={clsx(bem('skeleton',
        {
          animate,
        }), className)}
      style={style}
      {...others}
    >
      {avatar && (
        <View
          className={clsx(bem('avatar', [ avatarShape ]))}
          style={'width:' + avatarSize + ';height:' + avatarSize}
        />
      )}
      <View className={clsx(bem('content'))}>
        {title && (
          <View
            className={clsx(bem('title'))}
            style={'width:' + titleWidth}
          />
        )}
        {rowArray.map((_item, index) => {
          return (
            <View
              key={index}
              className={clsx(bem('row'))}
              style={'width:' + (isArray ? rowWidth[index] : rowWidth)}
            />
          )
        })}
      </View>
    </View>
  ) : (
    <View className={clsx(bem('content'))}>{children}</View>
  )
}

export default Skeleton
