import { View } from '@tarojs/components'
import { cloneElement, useCallback, useEffect, useMemo, useRef } from 'react'
import type { GridProps } from './PropsType'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'
import { rootStyle } from './wxs'

const [ bem ] = createNamespace('grid')

export function Grid(props: GridProps) {
  const {
    gutter = null,
    clickable,
    columnNum = 4,
    center = true,
    border = true,
    direction,
    iconSize = '48',
    square,
    reverse = false,
    className = '',
    style = {},
    ...others
  } = props

  const childrenInstance = useRef<any[]>([])

  const updateChildren = useCallback(function () {
    childrenInstance.current.forEach((child) => {
      child.updateStyle()
    })
  }, [])

  useEffect(
    function () {
      updateChildren()
    },
    [ updateChildren ],
  )

  const setChildrenInstance = useCallback(function (
    index: number,
    instance: any,
  ) {
    childrenInstance.current[index] = instance
  },
  [])

  const ResetChildren = useMemo(
    function () {
      const res: JSX.Element[] = []
      if (others.children && Array.isArray(others.children)) {
        others.children.forEach((child, index) => {
          res.push(
            cloneElement(child as JSX.Element, {
              setChildrenInstance,
              key: index,
              index,
              parentInstance: {
                columnNum,
                border,
                square,
                gutter,
                clickable,
                center,
                direction,
                reverse,
                iconSize,
              },
            }),
          )
        })
      }
      return res
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ others.children ],
  )

  return (
    <View
      className={clsx(
        bem(),
        {
          ['van-hairline--top']: border && !gutter,
        },
        className,
      )}
      style={computedStyle([
        rootStyle({
          gutter,
        }),
        style,
      ])}
    >
      {ResetChildren}
    </View>
  )
}
Grid.displayName = 'Grid'
export default Grid
