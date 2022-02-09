import { View } from '@tarojs/components'
import {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { DropdownMenuProps } from './PropsType'
import { displayTitle } from './wxs'
import { computedStyle, createNamespace, getRect, uuid, ZIndex } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('dropdown-menu')

let ARRAY: any[] = []

function DropdownMenu(props: DropdownMenuProps) {
  const {
    activeColor,
    overlay = true,
    zIndex = ZIndex.DropdownMenu,
    duration = 200,
    direction = 'down',
    closeOnClickOverlay = true,
    closeOnClickOutside = true,
    className,
    style,
    ...others
  } = props
  const id = useMemo(() => uuid(32), [])
  const [ itemListData, setItemListData ] = useState<any[]>([])
  const childrenInstance = useRef<any[]>([])
  const TimerKey = useRef<Date>()
  const close = useCallback(function () {
    childrenInstance.current.forEach((child) => {
      child.toggle(false, { immediate: true })
    })
  }, [])

  useLayoutEffect(
    function () {
      TimerKey.current = new Date()
      ARRAY.push({
        closeOnClickOutside,
        TimerKey,
        close,
      })
    },
    [ closeOnClickOutside, close ],
  )

  const updateItemListData = function () {
    setTimeout(() => {
      if (childrenInstance.current) {
        setItemListData(childrenInstance.current.map((child) => child))
      }
    }, 333)
  }

  useLayoutEffect(
    function () {
      updateItemListData()
    },
    [ others.children ],
  )

  useEffect(function () {
    return function () {
      ARRAY = (ARRAY || []).filter((item) => item && item.TimerKey !== TimerKey)
    }
  }, [])

  const toggleItem = useCallback(function (active: number) {
    childrenInstance.current.forEach((item: any, index: number) => {
      const { showPopup } = item
      if (index === Number(active)) {
        item.toggle()
      } else if (showPopup) {
        item.toggle(false, { immediate: true })
      }
    })
  }, [])

  const onTitleTap = useCallback(
    function (event: any) {
      const { index } = event.currentTarget.dataset
      const child = childrenInstance.current[index]
      if (!child.disabled) {
        ARRAY.forEach((menuItem) => {
          if (
            menuItem &&
            menuItem.closeOnClickOutside &&
            menuItem.TimerKey !== TimerKey
          ) {
            menuItem.close()
          }
        })
        setTimeout(() => {
          toggleItem(index)
        })
      }
    },
    [ toggleItem ],
  )

  const setChildrenInstance = useCallback(function (
    index: number,
    instance: any,
  ) {
    childrenInstance.current[index] = instance
  },
  [])

  const getChildWrapperStyle = useCallback(() => {
    return getRect(null, `#${id}`).then((rect: any) => {
      const wrapperStyle: any = {
        zIndex: zIndex,
        rect: rect,
      }

      return wrapperStyle
    })
  }, [ zIndex ])

  const ResetChildren = useMemo(
    function () {
      const res: JSX.Element[] = []
      Children.map(others.children, (children, index) => {
        res.push(
          cloneElement(children as JSX.Element, {
            direction,
            key: index,
            setChildrenInstance,
            index,
            parentInstance: {
              overlay,
              duration,
              activeColor,
              closeOnClickOverlay,
              direction,
              getChildWrapperStyle,
              updateItemListData,
            },
          }),
        )
      })
      return res
    },
    [
      activeColor,
      closeOnClickOverlay,
      direction,
      duration,
      getChildWrapperStyle,
      others.children,
      overlay,
      setChildrenInstance,
    ],
  )

  return (
    <View
      id={id}
      className={clsx(bem([ 'top-bottom' ]), className)}
      style={computedStyle([ style, { position: 'relative' } ])}
    >
      {(itemListData || []).map((item: any, index: number) => {
        return (
          <View
            key={item.index}
            data-index={index}
            className={clsx(
              bem('item', {
                disabled: item.disabled,
              }),
            )}
            onClick={onTitleTap}
          >
            <View
              className={clsx(
                bem('title', {
                  active: item.showPopup,
                  down: item.showPopup === (direction === 'down'),
                }),
                item.titleClass,
              )}
              style={item.showPopup ? 'color:' + activeColor : ''}
            >
              <View className={clsx('van-ellipsis', item.titleClass)}>
                {displayTitle(item)}
              </View>
            </View>
          </View>
        )
      })}
      {ResetChildren}
    </View>
  )
}
DropdownMenu.displayName = 'DropdownMenu'
export default DropdownMenu
