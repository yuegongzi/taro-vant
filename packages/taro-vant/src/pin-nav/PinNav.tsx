import type { FC } from 'react'
import type { PinNavItem, PinNavProps } from './PropsType'
import { createNamespace, ele, jumpLink } from '../utils'
import './style/index.less'
import Overlay from '../overlay'
import Icon from '../icon'
import classNames from 'clsx'
import { View } from '@tarojs/components'

const [ bem ] = createNamespace('pin-nav')

const PinNav: FC<PinNavProps> = (props) => {
  const {
    className,
    overlay,
    navList,
    visible,
    type,
    unActiveText,
    activeText,
    onChange,
    onSelect,
    position,
    icon,
  } = props
  const onUpdateValue = (value: boolean = !visible): void => {
    onChange?.(value)
  }
  const _onSelect = (item: PinNavItem) => {
    if (item.url) {
      jumpLink(item.url, item.linkType)
    }
    onSelect?.(item)
  }

  return (
    <View
      className={classNames(className, bem([ { active: visible }, type ]))}
      style={position}
    >
      {overlay && (
        <Overlay visible={visible} onClick={() => onUpdateValue(false)} />
      )}
      <View>
        <View className={classNames(bem('list'))}>
          {props.children ? (
            props.children
          ) : (
            <>
              {navList.map((item, index) => (
                <View
                  key={index}
                  onClick={() => _onSelect(item)}
                  className={classNames(bem('list-item'))}
                >
                  {ele(
                    item.icon,
                    <Icon
                      //@ts-ignore
                      name={item.icon}
                      className={classNames(bem('icon'))}
                    />,
                  )}
                  <View className={classNames(bem('item-text'))}>
                    {item.text}
                  </View>
                  {item.badge && (
                    <View className={classNames(bem('badge'))}>
                      {item.badge}
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
        </View>
      </View>
      <View
        className={classNames(bem('btn', [ type ]))}
        onClick={() => onUpdateValue()}
      >
        <Icon name={icon} />
        <View className={classNames(bem('text'))}>
          {visible ? activeText : unActiveText}
        </View>
      </View>
    </View>
  )
}

PinNav.defaultProps = {
  activeText: '收起导航',
  unActiveText: '快速导航',
  type: 'right',
  position: {
    top: 'auto',
    bottom: 'auto',
  },
  icon: 'arrow-left',
  navList: [],
}

export default PinNav
