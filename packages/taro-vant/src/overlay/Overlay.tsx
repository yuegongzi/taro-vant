import { useCallback } from 'react'
import { computedStyle, createNamespace, ZIndex } from '../utils'
import type { OverlayProps } from './PropsType'
import Transition from '../transition'
import clsx from 'clsx'

const [ bem ] = createNamespace('overlay')

function Overlay(props: OverlayProps) {
  const {
    visible,
    zIndex = ZIndex.Overlay,
    style,
    className,
    lockScroll = true,
    duration = 300,
    children,
    ...others
  } = props
  const _noop = useCallback((event) => {
    event.stopPropagation()
    event.preventDefault()
  }, [])
  return lockScroll ? (
    <Transition
      visible={visible}
      className={clsx(bem(), className)}
      style={computedStyle([ { 'z-index': zIndex }, style ])}
      duration={duration}
      onTouchMove={_noop}
      {...others}
    >
      {children}
    </Transition>
  ) : (
    <Transition
      visible={visible}
      className={clsx(bem(), className)}
      style={computedStyle([ { 'z-index': zIndex }, style ])}
      duration={duration}
      {...others}
    >
      {children}
    </Transition>
  )
}
Overlay.displayName = 'Overlay'
export default Overlay
