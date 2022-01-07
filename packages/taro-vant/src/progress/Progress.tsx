import './style/index.less'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import type { ProgressProps } from './PropsType'
import { BLUE, computedStyle, createNamespace, getRect } from '../utils'
import * as computed from './wxs'
import clsx from 'clsx'

const [ bem ] = createNamespace('progress')

function Progress(props: ProgressProps) {
  const [ right, setRight ] = useState(0)
  useEffect(
    function() {
      Taro.nextTick(() => {
        Promise.all([
          getRect(null, '.van-progress'),
          getRect(null, '.van-progress__pivot'),
        ]).then(([ portion, pivot ]: any) => {
          if (portion && pivot) {
            setRight((pivot.width * (props.percentage - 100)) / 100)
          }
        })
      })
    },
    [ props.percentage ],
  )
  const {
    strokeWidth = 4,
    trackColor,
    percentage,
    inactive,
    color = BLUE,
    textColor = '#ffffff',
    pivotColor,
    pivotText,
    showPivot = true,
    style,
    className,
    ...others
  } = props

  return (
    <View
      className={clsx(bem(), className)}
      style={computedStyle([
        computed.rootStyle({
          strokeWidth,
          trackColor,
        }),
        style,
      ])}
      {...others}
    >
      <View
        className={clsx(bem('portion'))}
        style={computed.portionStyle({
          percentage,
          inactive,
          color,
        })}
      >
        {showPivot && computed.pivotText(pivotText, percentage) && (
          <View
            style={computed.pivotStyle({
              textColor,
              pivotColor,
              inactive,
              color,
              right,
            })}
            className={clsx(bem('pivot'))}
          >
            {computed.pivotText(pivotText, percentage)}
          </View>
        )}
      </View>
    </View>
  )
}

export default Progress
