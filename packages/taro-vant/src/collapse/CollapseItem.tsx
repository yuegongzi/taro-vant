import { useReady } from '@tarojs/taro'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import type { CollapseItemProps } from './PropsType'
import Cell from '../cell'
import { setContentAnimate } from './animate'
import { createNamespace, ENV } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('collapse-item')

function CollapseItem(
  props: CollapseItemProps & {
    parent?: any
  },
) {
  const ref = useRef({
    mounted: false,
  })

  const [ state, setState ] = useState({
    index: undefined,
    expanded: false,
    animation: { actions: [] },
    ready: false,
  })

  const {
    parent,
    name = null,
    title = '',
    value = '',
    icon,
    label,
    disabled = false,
    clickable = false,
    border = true,
    isLink = true,
    rightIcon,
    style,
    className,
    children,
    ...others
  } = props

  useReady(() => {
    if (!ENV.h5) {
      setState((state) => {
        return {
          ...state,
          ready: true,
        }
      })
    }
  })
  useEffect(() => {
    setTimeout(() => {
      setState((state) => {
        return {
          ...state,
          ready: true,
        }
      })
    }, 0)
  }, [])

  const refDom = useRef(null)

  const updateExpanded = useCallback(() => {
    if (!parent) {
      return
    }
    const { value, accordion } = parent?.data
    const index = parent?.index
    const currentName = name == null ? index : name
    const expanded = accordion
      ? value === currentName
      : (value || []).some((name: any) => name === currentName)
    if (expanded !== state.expanded) {
      setContentAnimate(null, expanded, ref.current.mounted, setState, refDom)
    }
    setState((state) => {
      return {
        ...state,
        index,
        expanded,
      }
    })
  }, [ parent, name, state.expanded ])

  useEffect(() => {
    if (state.ready) {
      updateExpanded()
      ref.current.mounted = true
    }
  }, [ state.ready, updateExpanded ])

  useEffect(() => {
    if (state.ready) {
      updateExpanded()
    }
  }, [ state.ready, updateExpanded, parent.data ])

  const onClick = useCallback(
    (event: ITouchEvent) => {
      if (disabled) {
        return
      }
      const currentName = name == null ? parent?.index : name
      parent?.handleSwitch(event, currentName, !state.expanded)
    },
    [ parent, disabled, name, state.expanded ],
  )
  return (
    <View
      className={clsx(
        bem(),
        {
          ['van-hairline--top']: state.index !== 0,
        },
        className,
      )}
      style={style}
      {...others}
    >
      <Cell
        title={title}
        icon={icon}
        value={value}
        label={label}
        isLink={isLink}
        clickable={clickable}
        border={border && state.expanded}
        className={clsx(
          bem('title', {
            disabled,
            expanded: state.expanded,
          }),
        )}
        onClick={onClick}
        rightIcon={rightIcon}
      />
      <View
        className={clsx(bem('wrapper'), bem('animation-box'))}
        animation={state.animation}
      >
        <View className={clsx(bem('content'))} ref={refDom}>
          {children}
        </View>
      </View>
    </View>
  )
}

CollapseItem.displayName = 'CollapseItem'

export default CollapseItem
