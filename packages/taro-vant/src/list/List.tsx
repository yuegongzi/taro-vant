import React, {
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { CustomWrapper, ScrollView, View } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import Loading from '../loading'
import Empty from '../empty'
import Divider from '../divider'
import { useTouch } from '../hooks'
import { preventDefault, scrollOffset } from './utils'
import type { ListProps, PullRefreshStatus } from './PropsType'
import { createNamespace, ele } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('list')

const sleep = (t: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
const DEFAULT_HEAD_HEIGHT = 50
const TEXT_STATUS = [ 'pulling', 'loosing', 'success' ]

const List: React.FC<ListProps> = (props) => {
  const {
    headHeight = DEFAULT_HEAD_HEIGHT,
    successDuration = 500,
    animationDuration = 300,
    pullDistance = props.refresherThreshold || props.pullDistance,
    onRefresh,
    header,
    successText = '刷新成功',
    children,
    loadingText = '加载中...',
    loosingText = '释放即可刷新...',
    pullingText = '下拉即可刷新...',
    onLoad,
    onScroll: onScrollEvent,
    scrollTop,
    offset,
    finishedText = (
      <Divider contentPosition='center' dashed>
        我是有底线的
      </Divider>
    ),
    finished,
    errorText = '请求失败，点击重新加载',
    emptyDescription = '暂无数据',
    emptyImage,
    upperThreshold,
    lowerThreshold = props.lowerThreshold || props.offset || 250,
    refresherEnabled = true,
    scrollY = props.scrollY ?? true,
    className,
    empty = false,
    ...rest
  } = props
  const loadingRef = useRef(false)
  // 是否显示 报错
  const errorRef = useRef(false)
  const scrollRef = useRef<TaroElement>()
  const [ isError, setError ] = useState(false)
  // 是否滚动最上面了
  const reachTopRef = useRef(true)
  const [ status, setState ] = useState<PullRefreshStatus>('normal')
  const [ distance, setDistance ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  const touch = useTouch()
  const getHeadStyle = useCallback((): { height: string } | string => {
    if (headHeight !== DEFAULT_HEAD_HEIGHT) {
      return {
        height: `${headHeight}px`,
      }
    }
    return ''
  }, [ headHeight ])

  const isTouchable = useCallback(() => {
    return (
      status !== 'loading' &&
      status !== 'success' &&
      refresherEnabled &&
      !loadingRef.current
    )
  }, [ refresherEnabled, status ])

  const ease = useCallback(
    (distance: number) => {
      const _pullDistance = +(pullDistance || headHeight)

      if (distance > _pullDistance) {
        if (distance < _pullDistance * 2) {
          distance = _pullDistance + (distance - _pullDistance) / 2
        } else {
          distance = _pullDistance * 1.5 + (distance - _pullDistance * 2) / 4
        }
      }

      return Math.round(distance)
    },
    [ headHeight, pullDistance ],
  )

  const setStatus = useCallback(
    (distance: number, isLoading?: boolean) => {
      const _pullDistance = +(pullDistance || headHeight)
      setDistance(distance)
      if (isLoading) {
        setState('loading')
        loadingRef.current = true
      } else if (distance === 0) {
        setState('normal')
        loadingRef.current = false
      } else if (distance < _pullDistance) {
        setState('pulling')
      } else {
        setState('loosing')
      }
    },
    [ headHeight, pullDistance ],
  )

  const getStatusText = useCallback(() => {
    if (status === 'loading') {
      return loadingText
    }
    if (status === 'loosing') {
      return loosingText
    }
    if (status === 'pulling') {
      return pullingText
    }
    if (status === 'success') {
      return successText
    }
    return ''
  }, [ loadingText, loosingText, pullingText, status, successText ])

  const renderStatus = useCallback((): React.ReactNode => {
    const node = header?.({ status, distance })
    if (node) {
      return node
    }
    if (TEXT_STATUS.includes(status)) {
      return <View className={clsx(bem('text'))}>{getStatusText()}</View>
    }
    if (status === 'loading') {
      return (
        <Loading className={clsx(bem('loading'))}>{getStatusText()}</Loading>
      )
    }
    return ''
  }, [ distance, getStatusText, status, header ])

  const showSuccessTip = useCallback(async () => {
    // state.status = 'success'
    setState('success')
    await sleep(+successDuration)
  }, [ successDuration ])

  // 提前把reachTopRef.current的值 求出来
  const debounceScrollOffset = () => {
    return async () => {
      const { scrollTop } = (await scrollOffset(scrollRef.current!)) || {}
      reachTopRef.current = scrollTop === 0
    }
    // return debounce(getScrollTop, 400)
  }
  // 如果这是了 scrollTop 要触发ScrollOffset计算
  useEffect(() => {
    debounceScrollOffset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ scrollTop ])
  const onScroll = useCallback(
    (e) => {
      onScrollEvent?.(e)
      debounceScrollOffset()
    },
    [ debounceScrollOffset, onScrollEvent ],
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkPosition = useCallback(
    async (event: ITouchEvent) => {
      if (reachTopRef.current) {
        setDuration(0)
        touch.start(event)
      }
    },
    [ touch ],
  )

  const onTouchStart = useCallback(
    (event: ITouchEvent): void => {
      if (isTouchable()) {
        checkPosition(event)
      }
    },
    [ checkPosition, isTouchable ],
  )

  // list
  const onTouchMove = useCallback(
    (event: ITouchEvent): void => {
      if (isTouchable()) {
        const { deltaY } = touch
        touch.move(event)
        if (reachTopRef.current && deltaY.current >= 0 && touch.isVertical()) {
          preventDefault(event, true)
          setStatus(ease(deltaY.current))
        }
      }
    },
    [ ease, isTouchable, setStatus, touch ],
  )

  // list
  const doRefresh = useCallback(async () => {
    try {
      errorRef.current = false
      setStatus(+headHeight, true)
      setError(false)
      await onRefresh?.()
      setDuration(+animationDuration)
      if (successText) {
        await showSuccessTip()
      }
      setStatus(0, false)
      // 阻止下拉过程中 二次触发下拉
    } catch (e) {
      setStatus(0, false)
      // throw e
    }
  }, [
    animationDuration,
    headHeight,
    onRefresh,
    setStatus,
    showSuccessTip,
    successText,
  ])
  const onTouchEnd = useCallback(() => {
    // console.log('end', reachTopRef.current, touch.deltaY.current, isTouchable())
    if (reachTopRef.current && touch.deltaY.current && isTouchable()) {
      // state.duration = +animationDuration
      setDuration(+animationDuration)

      if (status === 'loosing') {
        doRefresh()
      } else {
        setStatus(0)
      }
    }
  }, [
    doRefresh,
    isTouchable,
    animationDuration,
    setStatus,
    status,
    touch.deltaY,
  ])
  const trackStyle = useMemo(
    () => ({
      transitionDuration: `${duration}ms`,
      transform: distance ? `translate3d(0,${distance}px, 0)` : '',
    }),
    [ distance, duration ],
  )

  // ==LIST=======================================
  const isBanLoad = useCallback(() => {
    return (
      finished || status !== 'normal' || loadingRef.current || errorRef.current
    )
  }, [ finished, status ])

  const doLoadMore = useCallback(async () => {
    if (isBanLoad()) return
    try {
      loadingRef.current = true
      await onLoad?.()
      loadingRef.current = false
    } catch (e) {
      loadingRef.current = false
      errorRef.current = true
      setError(true)
      // 这里要主动触发刷新
      // throw e
    }
  }, [ isBanLoad, onLoad ])

  useEffect(() => {
    doLoadMore()
  }, [])

  const placeholder = useRef<TaroElement>()

  const renderFinishedText = useCallback((): React.ReactNode => {
    if (finished) {
      const text = finishedText
      if (text) {
        if (isValidElement(text)) {
          return text
        }
        return <View className={clsx(bem('finished-text'))}>{text}</View>
      }
    }
    return null
  }, [ finished, finishedText ])

  const renderLoadingText = useCallback((): React.ReactNode => {
    if (!finished && scrollY) {
      return (
        <View className={clsx(bem('loading'))}>
          {ele(
            loadingText,
            <Loading className={clsx(bem('loading-icon'))}>
              {loadingText}`
            </Loading>,
          )}
        </View>
      )
    }
    return null
  }, [ finished, loadingText, scrollY ])

  const clickErrorText = useCallback(() => {
    setError(false)
    errorRef.current = false
    doLoadMore()
    // web 很奇怪的问题
  }, [ doLoadMore ])

  const renderErrorText = useCallback((): React.ReactNode => {
    if (isError) {
      if (errorText) {
        return (
          <View className={clsx(bem('error-text'))} onClick={clickErrorText}>
            {errorText}
          </View>
        )
      }
    }
    return null
  }, [ clickErrorText, isError, errorText ])
  // 如果不定高 一直下拉

  const ListScrollContent = useCallback(() => {
    if (empty) {
      return <Empty description={emptyDescription} image={emptyImage} />
    }
    if (isError) {
      return renderErrorText()
    }

    if (finished) {
      return renderFinishedText()
    }

    return renderLoadingText()
  }, [
    finished,
    isError,
    renderLoadingText,
    emptyDescription,
    emptyImage,
    renderErrorText,
    renderFinishedText,
  ])

  return (
    <ScrollView
      ref={scrollRef}
      lowerThreshold={lowerThreshold}
      onScroll={onScroll}
      scrollTop={scrollTop}
      onScrollToLower={doLoadMore}
      scrollY={scrollY}
      className={`${bem()} ${className || ''}`}
      {...rest}
    >
      <View
        className={clsx(bem('track'))}
        style={trackStyle}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        <CustomWrapper>
          <View className={clsx(bem('head'))} style={getHeadStyle()}>
            {renderStatus()}
          </View>
        </CustomWrapper>
        {children}
        <View ref={placeholder} className={clsx(bem('placeholder'))} />
        {ListScrollContent()}
      </View>
    </ScrollView>
  )
}
List.displayName = 'List'
export default List
