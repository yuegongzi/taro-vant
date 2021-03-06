import { View } from '@tarojs/components'
import { cloneElement, useCallback, useEffect, useMemo, useRef } from 'react'
import type { SidebarProps } from './PropsType'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('sidebar')

function Sidebar(props: SidebarProps) {
  const { activeKey, onChange, className, children, style, ...others } = props

  const childrenInstance = useRef<any[]>([])

  const setAction = useCallback(function (activeKey) {
    const childrenInstance_ = childrenInstance.current
    if (!childrenInstance_ || !childrenInstance_.length) {
      return Promise.resolve()
    }
    // setcurrentActive(activeKey)
    childrenInstance_.forEach((item) => {
      item.setActive(false)
    })
    if (childrenInstance_[activeKey]) {
      childrenInstance_[activeKey].setActive(true)
    }
    return Promise.resolve()
  }, [])

  useEffect(
    function () {
      setAction(activeKey)
    },
    [ setAction, activeKey ],
  )

  const setChildren = useCallback(function (index: number, instance: any) {
    childrenInstance.current[index] = instance
  }, [])

  const ResetChildren = useMemo(
    function () {
      const res: JSX.Element[] = []
      if (children && Array.isArray(children)) {
        children.forEach((child, index) => {
          res.push(
            cloneElement(child as JSX.Element, {
              key: index,
              setChildren,
              index,
              setAction,
              onChange,
            }),
          )
        })
      }
      return res
    },
    [ children, onChange, setAction, setChildren ],
  )

  return (
    <View
      style={computedStyle([ style ])}
      className={clsx(bem(), className)}
      {...others}
    >
      {ResetChildren}
    </View>
  )
}

Sidebar.displayName = 'Sidebar'
export default Sidebar
