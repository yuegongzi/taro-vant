import './style/index.less'
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { CustomWrapper, View } from '@tarojs/components'
import type { PickerColumnProps } from './PropsType'
import { computedStyle, createNamespace, isObj, range } from '../utils'
import { optionText, rootStyle, wrapperStyle } from './wxs'
import clsx from 'clsx'

const [ bem ] = createNamespace('picker-column')

const DEFAULT_DURATION = 200

function Index(
  props: PickerColumnProps & { index: number },
  ref: any,
): JSX.Element {
  const {
    valueKey,
    itemHeight = 48,
    visibleItemCount = 5,
    initialOptions,
    defaultIndex,
    className,
    style,
    onChange,
    activeClass,
    index: curColIndex,
    ...others
  } = props

  const [ options, setOptions ] = useState<any[]>([])
  const [ currentIndex, setCurrentIndex ] = useState<unknown>()
  const [ duration, setDuration ] = useState(0)
  const [ startY, setStartY ] = useState(0)
  const [ offset, setOffset ] = useState(0)
  const [ startOffset, setStartOffset ] = useState(0)
  const [ canInit, setCanInit ] = useState(true)

  const isDisabled = useCallback(function(option) {
    return isObj(option) && option.disabled
  }, [])

  const adjustIndex = useCallback(
    function(index: number): any {
      const initialOptions_ = (
        options.length ? options : initialOptions
      ) as any[]
      const count = initialOptions_.length
      index = range(index, 0, count)
      for (let i = index; i < count; i++) {
        if (!isDisabled(initialOptions_[i])) {
          return i
        }
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isDisabled(initialOptions_[i])) {
          return i
        }
      }
    },
    [ isDisabled, options, initialOptions ],
  )

  const setIndex = useCallback(
    function(index: number, userAction?: boolean) {
      index = adjustIndex(index) || 0
      const offset = -index * Number(itemHeight)
      if (index !== currentIndex) {
        setCurrentIndex(index)
        setOffset(offset)
        if (onChange && userAction) onChange(curColIndex)
        return
      }
      return setOffset(offset)
    },
    [ adjustIndex, curColIndex, currentIndex, itemHeight, onChange ],
  )

  useEffect(function() {
    setCurrentIndex(defaultIndex)
    setIndex(defaultIndex || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    function() {
      if (canInit) {
        setOptions(initialOptions || [])
      }
    },
    [ canInit, initialOptions ],
  )

  const onTouchMove = useCallback(
    function(event) {
      event.preventDefault()
      event.stopPropagation()
      const deltaY = event.touches[0].clientY - startY
      setOffset(
        range(
          startOffset + deltaY,
          -(options.length * Number(itemHeight)),
          itemHeight,
        ),
      )
    },
    [ startOffset, itemHeight, options, startY ],
  )

  const onTouchStart = useCallback(
    function(event) {
      setStartY(event.touches[0].clientY)
      setStartOffset(offset)
      setDuration(0)
    },
    [ offset ],
  )

  const onTouchEnd = useCallback(
    function() {
      if (offset !== startOffset) {
        setDuration(DEFAULT_DURATION)
        const index = range(
          Math.round(-offset / Number(itemHeight)),
          0,
          options.length - 1,
        )
        setTimeout(() => {
          setIndex(index, true)
        }, 5.5)
      }
    },
    [ startOffset, offset, itemHeight, options.length, setIndex ],
  )

  const onClickItem = useCallback(
    function(event) {
      const { index } = event.currentTarget.dataset
      setTimeout(() => {
        setIndex(Number(index), true)
      })
    },
    [ setIndex ],
  )

  const getCurrentIndex = useCallback(
    function() {
      return currentIndex
    },
    [ currentIndex ],
  )

  const getValue = useCallback(
    function() {
      return options[currentIndex as number]
    },
    [ options, currentIndex ],
  )

  const getOptionText = useCallback(
    function(option) {
      return isObj(option) && valueKey && valueKey in option
        ? option[valueKey]
        : option
    },
    [ valueKey ],
  )

  const setValue = useCallback(
    function(value) {
      for (let i = 0; i < options.length; i++) {
        if (getOptionText(options[i]) === value) {
          return setIndex(i)
        }
      }
      return Promise.resolve()
    },
    [ setIndex, getOptionText, options ],
  )

  useImperativeHandle(ref, () => {
    return {
      getCurrentIndex,
      getValue,
      setValue,
      props,
      setIndex,
      set: (opt: any) =>
        new Promise<void>((resolve) => {
          setOptions(opt.options)
          setCanInit(false)
          resolve()
        }),
    }
  })

  return (
    <View
      className={clsx(bem(), className)}
      style={computedStyle([
        rootStyle({
          itemHeight,
          visibleItemCount,
        }),
        style,
      ])}
      {...others}
    >
      <CustomWrapper>
        <View
          style={wrapperStyle({
            offset,
            itemHeight,
            visibleItemCount,
            duration,
          })}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          catchMove
        >
          {options.map((option: any, index: number) => {
            return (
              <View
                key={`picker-column__item${index}`}
                data-index={index}
                style={{ height: itemHeight + 'px' }}
                className={clsx(bem('item', {
                  disabled: option && option.disabled,
                  selected: index === currentIndex,
                }), className, 'van-ellipsis', {
                  [`${activeClass}`]: index === currentIndex,
                })}
                onClick={onClickItem}
              >
                {optionText(option, valueKey)}
              </View>
            )
          })}
        </View>
      </CustomWrapper>
    </View>
  )
}

const PickerColumn = memo(forwardRef(Index))
PickerColumn.displayName = 'PickerColumn'
export default PickerColumn
