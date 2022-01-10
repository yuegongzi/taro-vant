import './style/index.less'
import { ScrollView, View } from '@tarojs/components'
import { useCallback, useEffect, useState } from 'react'
import Sidebar from '../sidebar'
import Icon from '../icon'
import * as computed from './wxs'
import type { TreeSelectProps } from './PropsType'
import { addUnit, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('tree-select')
const SidebarItem = Sidebar.Item

function TreeSelect(props: TreeSelectProps) {
  const {
    items = [],
    selectedIcon = 'success',
    height = 300,
    mainActiveIndex = 0,
    activeId,
    max = Infinity,
    onClickItem,
    onClickNav,
    contentActiveClass,
    contentDisabledClass,
  } = props
  const [ subItems, setSubItems ] = useState<any[]>([])
  const _onSelectItem = useCallback(
    (event, item) => {
      const isArray = Array.isArray(activeId)
      // 判断有没有超出右侧选择的最大数
      const isOverMax = isArray && (activeId as any[]).length >= max
      // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
      const isSelected = isArray
        ? (activeId as any[]).includes(item.id)
        : activeId === item.id
      if (!item.disabled && (!isOverMax || isSelected)) {
        Object.defineProperty(event, 'detail', {
          value: item,
        })
        onClickItem?.(event)
      }
    },
    [ activeId, max, onClickItem ],
  )

  const _onClickNav = useCallback(
    ({ detail: index }) => {
      const item = items[index]
      if (!item?.disabled) {
        onClickNav?.({ detail: { index } })
      }
    },
    [ onClickNav, items ],
  )

  useEffect(() => {
    const { children = [] } = items[mainActiveIndex] || {}
    setSubItems(children)
  }, [ items, mainActiveIndex, setSubItems ])

  return (
    <View className={clsx(bem())}
          style={'height: ' + addUnit(height)}
    >
      <ScrollView scrollY className={clsx(bem('nav'))}>
        <Sidebar
          activeKey={mainActiveIndex}
          onChange={_onClickNav}
          className={clsx(bem('nav__inner'))}
        >
          {items.map((item: any, index: number) => {
            return (
              <SidebarItem
                key={index}
                badge={item.badge}
                dot={item.dot}
                title={item.text}
                disabled={item.disabled}
              />
            )
          })}
        </Sidebar>
      </ScrollView>
      <ScrollView scrollY className={clsx(bem('content'))}>
        {subItems.map((item: any) => {
          return (
            <View
              key={item.id}
              className={clsx(bem('item', {
                active: computed.isActive(activeId, item.id),
                disabled: item.disabled,
              }), 'van-ellipsis', {
                [`${contentActiveClass}`]: computed.isActive(activeId, item.id),
                [`${contentDisabledClass}`]: item.disabled,
              })}
              data-item={item}
              onClick={(e) => {
                _onSelectItem(e, item)
              }}
            >
              {item.text}
              {computed.isActive(activeId, item.id) && (
                <Icon
                  name={selectedIcon}
                  size='16px'
                  className={clsx(bem('selected'))}
                />
              )}
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

TreeSelect.displayName = 'TreeSelect'
export default TreeSelect
