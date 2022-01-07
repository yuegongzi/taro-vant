import './style/index.less'
import Taro from '@tarojs/taro'
import { cloneElement, isValidElement, useCallback, useEffect, useState } from 'react'
import toArray from 'rc-util/lib/Children/toArray'
import { Block, View } from '@tarojs/components'
import { computedStyle, createNamespace, getRect, Tabbar as InnerTabbar } from '../utils'
import type { TabbarProps,TabbarItemProps } from './PropsType'
import clsx from 'clsx'

const [ bem ] = createNamespace('tabbar')

function parseTabList(children: React.ReactNode): any[] {
  return toArray(children).map((node: React.ReactElement<TabbarItemProps>) => {
    if (isValidElement(node)) {
      const key = node.key !== undefined ? String(node.key) : undefined
      return {
        key,
        ...node.props,
        node,
      }
    }

    return null
  }).filter((tab) => tab)
}

export function Tabbar(props: TabbarProps) {
  const [ state, setState ]: any = useState({
    height: 50,
    current: 0,
  })
  const { height, current } = state

  const {
    active,
    activeColor,
    inactiveColor,
    border = true,
    fixed = true,
    safeAreaInsetBottom = true,
    zIndex = InnerTabbar,
    placeholder,
    onChange,
    style,
    className,
    children,
    ...others
  } = props
  const _change = useCallback(
    function(data) {
      setState((pre: any) => {
        return {
          ...pre,
          current: data,
        }
      })
      onChange?.({ detail: data })
    },
    [ onChange ],
  )
  const tabs = parseTabList(children)
  const newChildren: any = tabs.map((tab, index) => {
    return cloneElement(tab.node, {
      key: index,
      index: index,
      active: current,
      activeColor: activeColor,
      inactiveColor: inactiveColor,
      onChange: _change,
    })
  })

  useEffect(
    function() {
      setState((pre: any) => {
        return {
          ...pre,
          current: active,
        }
      })
    },
    [ active ],
  )

  useEffect(
    function() {
      if (!fixed || !placeholder) {
        return
      }
      Taro.nextTick(() => {
        getRect(null, '.van-tabbar').then((res: any) => {
          setState((pre: any) => {
            return {
              ...pre,
              height: res.height,
            }
          })
        })
      })
    },
    [ fixed, placeholder ],
  )
  return (
    <Block>
      <View className={clsx(bem(
        { fixed, safe: safeAreaInsetBottom }), {
        'van-hairline--top-bottom': border,
      }, className)}

            style={computedStyle([ zIndex ? 'z-index: ' + zIndex : '', style ])}
            {...others}
      >
        {newChildren}
      </View>
      {fixed && placeholder && (
        <View style={'height: ' + height + 'px;'} />
      )}
    </Block>
  )
}

export default Tabbar
