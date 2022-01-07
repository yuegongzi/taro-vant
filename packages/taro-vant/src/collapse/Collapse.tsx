import './style/index.less'
import { Children, cloneElement, useCallback, useMemo } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import type { CollapseProps } from './PropsType'
import clsx from 'clsx'
import { createNamespace } from '../utils'

const [ bem ] = createNamespace('collapse')

export function Collapse(props: CollapseProps) {
  const {
    value,
    accordion = false,
    border = true,
    onOpen,
    onClose,
    onChange,
    style,
    className,
    children,
    ...others
  } = props

  const handleSwitch = useCallback(
    (event: ITouchEvent, name: any, expanded: any) => {
      const changeItem = name
      if (!accordion) {
        name = expanded
          ? (value || []).concat(name)
          : (value || []).filter((activeName) => activeName !== name)
      } else {
        name = expanded ? name : ''
      }
      Object.defineProperty(event, 'detail', {
        value: changeItem,
        writable: true,
      })
      if (expanded) {
        onOpen?.(event)
      } else {
        onClose?.(event)
      }
      event.detail = name
      onChange?.(event)
    },
    [ value, accordion, onOpen, onClose, onChange ],
  )

  const newChildren: any = useMemo(() => {
    return Children.map(children, (child: any, index: number) => {
      return cloneElement(child, {
        key: index,
        parent: {
          index,
          handleSwitch,
          data: {
            value,
            accordion,
          },
        },
      })
    })
  }, [ children, value, accordion, handleSwitch ])

  return (
    <View
      className={clsx(bem(), {
        ['van-hairline--top-bottom']: border,
      }, className)}
      style={style}
      {...others}
    >
      {newChildren}
    </View>
  )
}
Collapse.displayName = 'Collapse'
export default Collapse
