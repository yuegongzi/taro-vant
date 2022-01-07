import './style/index.less'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import Icon from '../icon'
import type { RateProps } from './PropsType'
import { addUnit, computedStyle, createNamespace,getAllRect } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('rate')
let comIndex = 0

export function Rate(props: RateProps) {
  const {
    count = 5,
    gutter,
    icon = 'star',
    voidIcon = 'star-o',
    disabled,
    size,
    disabledColor,
    color,
    voidColor,
    allowHalf,
    readonly,
    touchable = true,
    value,
    onChange,
    style,
    className,
    defaultValue = 5,
    ...others
  } = props
  const indexRef = useRef(comIndex)
  const [ countArray, setCountArray ] = useState(Array.from({ length: count }))
  const noControlled = useMemo(() => typeof value === 'undefined', [ value ])
  const [ innerValue, setInnerValue ] = useState(
    noControlled ? defaultValue : (value as number),
  )
  useEffect(() => {
    comIndex++
    indexRef.current = comIndex
  }, [])

  const onSelect = function(event: ITouchEvent) {
    const { score } = event.currentTarget.dataset
    Object.defineProperty(event, 'detail', {
      value: +score + 1,
    })

    if (!disabled && !readonly) {
      if (noControlled) {
        setInnerValue(event.detail as number)
      }
      onChange?.(event)
    }
  }
  // touchmove匹配到的节点找不到data-score，先注释掉
  const onTouchMove = function(event: ITouchEvent) {
    if (!touchable) return

    const { clientX } = event?.touches?.[0] ?? {}
    if (clientX) {
      getAllRect(
        null,
        `.van-rate--${indexRef.current} .van-rate__icon`,
      ).then((list: any) => {
        const targetIndex = list.sort((a: any, b: any) => a.right - b.right).findIndex(
          (item: any) => clientX >= item.left && clientX <= item.right,
        )
        if (targetIndex !== -1) {
          onSelect(
            Object.assign(Object.assign({}, event), {
              currentTarget: {
                dataset: {
                  score: allowHalf ? targetIndex / 2 - 0.5 : targetIndex,
                },
              },
            }),
          )
        }
      })
    }
  }

  useEffect(
    function() {
      setCountArray(Array.from({ length: count }))
    },
    [ count ],
  )

  const rateValue = noControlled ? innerValue : (value as number)

  return (
    <View className={clsx(bem([ `${indexRef.current}` ]), className)}
          style={style}
          onTouchMove={onTouchMove}
          {...others}
    >
      {countArray.map((_item: any, index) => {
        return (
          <View
            className={clsx(bem('item'))}
            key={index}
            style={computedStyle({
              paddingRight: index !== count - 1 ? addUnit(gutter) : null,
            })}
          >
            <Icon
              name={index + 1 <= rateValue ? icon : voidIcon}
              className={clsx(bem('icon', [
                {
                  disabled,
                  full: index + 1 <= rateValue,
                },
              ]))}
              style={computedStyle({
                fontSize: addUnit(size),
              })}
              id={`rate-com-index${indexRef.current}-rate__${index}`}
              data-score={index}
              color={
                disabled
                  ? disabledColor
                  : index + 1 <= rateValue
                    ? color
                    : voidColor
              }
              onClick={onSelect}
            />
            {allowHalf && (
              <Icon
                name={index + 0.5 <= rateValue ? icon : voidIcon}
                className={clsx(bem('icon', [
                  'half',
                  {
                    disabled,
                    full: index + 0.5 <= rateValue,
                  },
                ]))}
                style={computedStyle({
                  fontSize: addUnit(size),
                })}
                id={`rate-com-index${indexRef.current}-rate__${index - 0.5}`}
                data-score={index - 0.5}
                color={
                  disabled
                    ? disabledColor
                    : index + 0.5 <= rateValue
                      ? color
                      : voidColor
                }
                onClick={onSelect}
              />
            )}
          </View>
        )
      })}
    </View>
  )
}

export default Rate
