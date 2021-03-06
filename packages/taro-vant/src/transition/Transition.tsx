import { View } from '@tarojs/components'
import type { TransitionProps } from './PropsType'
import { rootStyle } from './wxs'
import { useTransition } from '../hooks'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('transition')

function Transition(props: TransitionProps) {
  const {
    onBeforeEnter,
    onBeforeLeave,
    onAfterEnter,
    onAfterLeave,
    onEnter,
    onLeave,
    duration,
    name,
    visible,
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
    visible,
    duration,
    name,
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
      <View
        className={clsx(bem(), classes, className)}
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

Transition.displayName = 'Transition'
export default Transition
