import { createAnimation, nextTick, useReady } from '@tarojs/taro'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { Navigator, View } from '@tarojs/components'
import type { NoticeBarProps } from './PropsType'
import {
  computedStyle,
  createNamespace,
  ele,
  ENV,
  getRect,
  requestAnimationFrame,
  uuid,
} from '../utils'
import Icon from '../icon'
import { rootStyle } from './wxs'
import clsx from 'clsx'

const [ bem ] = createNamespace('notice-bar')

export function NoticeBar(props: NoticeBarProps) {
  const [ contentId, wrapId ] = useMemo(() => [ uuid(32), uuid(32) ], [])
  const [ state, setState ] = useState({
    ready: false,
    show: true,
    animationData: { actions: [] },
  })

  const params: any = {
    animation: null,
    resetAnimation: null,
    timer: null,
    wrapWidth: undefined,
    contentWidth: undefined,
    duration: undefined,
  }

  const ref = useRef<any>(params)

  const {
    text = '',
    mode = '',
    url = '',
    openType = 'navigate',
    delay = 1,
    speed = 60,
    scrollable = null,
    leftIcon = '',
    color = '#ed6a0c',
    backgroundColor = '#fffbe8',
    background,
    wrapable,
    onClick,
    onClose,
    style,
    className,
    children,
    ...others
  } = props

  useReady(() => {
    if (ENV.h5) {
      ref.current.resetAnimation = createAnimation({
        duration: 0,
        timingFunction: 'linear',
      })

      setState((state) => {
        return {
          ...state,
          ready: true,
        }
      })
    }
  })
  useEffect(() => {
    ref.current.resetAnimation = createAnimation({
      duration: 0,
      timingFunction: 'linear',
    })

    setState((state) => {
      return {
        ...state,
        ready: true,
      }
    })
  }, [])

  const scroll = useCallback(() => {
    if (ref.current?.timer) {
      clearTimeout(ref.current.timer)
    }
    ref.current.timer = null
    setState((state) => {
      return {
        ...state,
        animationData: ref.current.resetAnimation.
          translateX(ref.current.wrapWidth).
          step().
          export(),
      }
    })
    setTimeout(() => {
      requestAnimationFrame(() => {
        setState((state) => {
          return {
            ...state,
            animationData: ref.current.animation.
              translateX(-ref.current.contentWidth).
              step().
              export(),
          }
        })
      })
    }, 10)
    ref.current.timer = setTimeout(() => {
      scroll()
    }, ref.current.duration)
  }, [])
  const init = useCallback(() => {
    requestAnimationFrame(() => {
      Promise.all([
        getRect(null, `#${contentId}`),
        getRect(null, `#${wrapId}`),
      ]).then((rects) => {
        const contentRect: any = rects[0]
        const wrapRect: any = rects[1]

        if (
          contentRect == null ||
          wrapRect == null ||
          !contentRect.width ||
          !wrapRect.width ||
          scrollable === false
        ) {
          return
        }
        nextTick(() => {
          if (scrollable || wrapRect.width <= contentRect.width) {
            ref.current.wrapWidth = wrapRect.width
            ref.current.contentWidth = contentRect.width
            ref.current.duration =
              ((wrapRect.width + contentRect.width) / speed) * 1000
            ref.current.animation = createAnimation({
              duration: ref.current.duration,
              timingFunction: 'linear',
              delay,
            })
            scroll()
          }
        })
      })
    })
  }, [ scrollable, speed, delay, scroll ])

  const onClickIcon = useCallback(
    (event: ITouchEvent) => {
      if (mode === 'closeable') {
        if (ref.current?.timer) {
          clearTimeout(ref.current.timer)
        }
        ref.current.timer = null
        setState((state) => {
          return {
            ...state,
            show: false,
          }
        })
        onClose?.(event)
      }
    },
    [ mode, onClose ],
  )

  useEffect(() => {
    if (text && state.ready) {
      init()
    }
    return () => {
      if (ref.current.timer) {
        clearTimeout(ref.current.timer)
      }
    }
  }, [ text, speed, state.ready ])
  return (
    state.show && (
      <View
        className={clsx(bem({ withicon: mode, wrapable }), className)}
        style={computedStyle([
          rootStyle({
            color,
            backgroundColor,
            background,
          }),
          style,
        ])}
        {...others}
        onClick={onClick}
      >
        {ele(
          leftIcon,
          <Icon name={leftIcon} className={clsx(bem('left-icon'))} />,
        )}
        <View id={wrapId} className={clsx(bem('wrap'))}>
          <View
            id={contentId}
            className={clsx(bem('content'), {
              'van-ellipsis': scrollable === false && !wrapable,
            })}
            animation={state.animationData}
          >
            {text}
            {!text && children}
          </View>
        </View>

        {mode === 'closeable' && (
          <Icon
            className={clsx(bem('right-icon'))}
            name={'cross'}
            onClick={onClickIcon}
          />
        )}
        {mode === 'link' && (
          <Navigator url={url} openType={openType}>
            <Icon className={clsx(bem('right-icon'))} name='arrow' />
          </Navigator>
        )}
      </View>
    )
  )
}

NoticeBar.displayName = 'NoticeBar'
export default NoticeBar
