import './style/index.less'
import { useCallback } from 'react'
import { Overlay as InnerOverlay, createNamespace, computedStyle } from '../utils'
import type { OverlayProps } from './PropsType'
import Transition from '../transition'
import clsx from 'clsx'

const [ bem ] = createNamespace('overlay')

function Overlay(props: OverlayProps) {
  const {
    show,
    zIndex = InnerOverlay,
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
      show={show}
      className={clsx(bem(),className)}
      style={computedStyle([ { 'z-index': zIndex }, style ])}
      duration={duration}
      onTouchMove={_noop}
      {...others}
    >
      {children}
    </Transition>
  ) : (
    <Transition
      show={show}
      className={clsx(bem(),className)}
      style={computedStyle([ { 'z-index': zIndex }, style ])}
      duration={duration}
      {...others}
    >
      {children}
    </Transition>
  )
}

export default Overlay
