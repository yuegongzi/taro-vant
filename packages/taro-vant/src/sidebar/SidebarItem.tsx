import './style/index.less'
import { View } from '@tarojs/components'
import { useCallback, useEffect, useState } from 'react'
import type { SidebarItemProps } from './PropsType'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'
import { Badge } from '../badge'

const [ bem ] = createNamespace('sidebar-item')

function SidebarItem(
  props: SidebarItemProps & {
    setChildren?: any
    index?: number
    setAction?: any
  },
) {
  const {
    dot,
    badge,
    index,
    renderTitle,
    setChildren,
    setAction,
    onClick,
    onChange,
    title,
    disabled,
    className,
    style,
    activeClass,
    disabledClass,
    ...others
  } = props

  const [ selected, setselected ] = useState<any>()

  const setActive = useCallback(function(selected) {
    return setselected(selected)
  }, [])

  useEffect(
    function() {
      setChildren?.(index, { setActive, selected })
    },
    [ setActive, index, setChildren, selected ],
  )

  const onClick_ = useCallback(
    function() {
      if (disabled) return
      setAction(index).then(() => {
        onChange?.({ detail: index } as any)
        onClick?.(index)
      })
    },
    [ disabled, index, onChange, onClick, setAction ],
  )
  const _renderTitle = () => {
    if (title) {
      return (<View>{title}</View>)
    }
    return renderTitle?.()
  }
  return (
    <View className={clsx(bem({
      selected,
      disabled,
    }), {
      [`${activeClass}`]: selected,
      [`${disabledClass}`]: disabled,
    }, className)}
          hoverClass={clsx(bem('', [ 'hover' ], true))}
          hoverStayTime={70}
          onClick={onClick_}
          style={computedStyle([ style ])}
          {...others}
    >
      <View className={clsx(bem('text'))}>
        {(badge != null || dot) ? (
          <Badge dot={dot} content={badge}>
            {_renderTitle()}
          </Badge>
        ) : _renderTitle()}

      </View>
    </View>
  )
}
SidebarItem.displayName = 'SidebarItem'
export default SidebarItem
