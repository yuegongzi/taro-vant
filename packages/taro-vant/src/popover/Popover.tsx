import type { FC } from 'react'
import { useState } from 'react'
import type { PopoverProps } from './PropsType'
import { createNamespace } from '../utils'
import './style/index.less'
import classNames from 'clsx'
import PopoverItem from './PopoverItem'
import { View } from '@tarojs/components'
import Transition from '../transition'

const [ bem ] = createNamespace('popover')

const Popover: FC<PopoverProps> = (props) => {
  const {
    className,
    placement,
    actions,
    theme,
    onClose,
    onOpen,
    onSelect,
    closeOnClickAction,
    closeOnClickOverlay,
  } = props
  const [ visible, setVisible ] = useState<boolean>(false)
  const onMaskClick = () => {
    if (closeOnClickOverlay) {
      setVisible(false)
      onClose?.()
    }
  }
  const onClick = () => {
    if (visible) {
      setVisible(false)
      onClose?.()
    } else {
      setVisible(true)
      onOpen?.()
    }
  }

  return (
    <View className={classNames(className, bem())}>
      <View onClick={onClick}>{props.children}</View>
      <Transition
        visible={visible}
        duration={0}
        className={classNames(bem('container'))}
      >
        <View className={classNames(bem('mask'))} onClick={onMaskClick} />
        <View className={classNames(bem('content', [ placement ]))}>
          <View className={classNames(bem('arrow', [ theme ]))} />
          <View className={classNames(bem('inner', [ theme ]))}>
            {actions.map((action, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <PopoverItem
                key={index}
                {...action}
                onClick={() => {
                  if (action.disabled) {
                    return
                  }
                  onSelect?.(action, index)
                  if (closeOnClickAction) {
                    setVisible(false)
                  }
                }}
              />
            ))}
          </View>
        </View>
      </Transition>
    </View>
  )
}

Popover.defaultProps = {
  placement: 'bottom',
  actions: [],
  duration: 300,
  closeOnClickAction: true,
  closeOnClickOverlay: true,
}
Popover.displayName = 'Popover'
export default Popover
