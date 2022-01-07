import './style/index.less'
import { View } from '@tarojs/components'
import type { TransitionPropsCom } from './PropsType'
import { rootStyle } from './wxs'
import { useTransition } from '../hooks'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('transition')

function Transition(props: TransitionPropsCom) {
  const {
    onBeforeEnter,
    onBeforeLeave,
    onAfterEnter,
    onAfterLeave,
    onEnter,
    onLeave,
    duration,
    name,
    show,
    children,
    style,
    className,
    enterClass,
    enterActiveClass,
    enterToClass,
    leaveClass,
    leaveActiveClass,
    leaveToClass,
    ...others
  } = props
  const { currentDuration, classes, display, onTransitionEnd } = useTransition({
    show,
    duration: duration,
    name: name,
    enterClass,
    enterActiveClass,
    enterToClass,
    leaveClass,
    leaveActiveClass,
    leaveToClass,
    onBeforeEnter,
    onBeforeLeave,
    onAfterEnter,
    onAfterLeave,
    onEnter,
    onLeave,
  })

  return (
    <>
      <View className={clsx(bem(), classes, className)}
            style={computedStyle([
              rootStyle({
                currentDuration,
                display,
              }),
              style,
            ])}
            onTransitionEnd={onTransitionEnd}
            {...others}
            catchMove
      >
        {children}
      </View>
    </>
  )
}

export default Transition
