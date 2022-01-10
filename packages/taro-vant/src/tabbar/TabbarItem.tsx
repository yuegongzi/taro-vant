
import { View } from '@tarojs/components'
import Icon from '../icon'
import type { TabbarItemProps } from './PropsType'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('tabbar-item')

function TabbarItem(
  props: TabbarItemProps & {
    index?: number
    active?: number
    activeColor?: string
    inactiveColor?: string
    onChange?: (data?: string | number) => void
  },
) {
  const {
    icon,
    name,
    iconPrefix = 'van-icon',
    dot,
    badge,
    index = 0,
    active,
    activeColor,
    inactiveColor,
    onChange,
    children,
    style,
    className,
    onClick,
    ...others
  } = props

  const _click = function() {
    if (onChange) {
      const _active = name ?? index
      if (_active !== active) {
        onChange(_active)
      }
    }

    onClick?.(name ?? index)
  }

  return onChange ? (
    <View
      className={clsx(bem({
        active: active === (name ?? index),
      }), className)}
      style={computedStyle([
        {
          color: active === (name ?? index) ? activeColor : inactiveColor,
        },
        style,
      ])}
      {...others}
      onClick={_click}
    >
      <View className={clsx(bem('icon'))}>
        {icon && <Icon
          size={38}
          badge={badge}
          name={icon}
          dot={dot}
          classPrefix={iconPrefix}
          className={clsx(bem('icon__inner'))}
        />}
      </View>
      <View className={clsx(bem('text'))}>{children}</View>
    </View>
  ) : (
    <></>
  )
}
TabbarItem.displayName = 'TabbarItem'
export default TabbarItem
