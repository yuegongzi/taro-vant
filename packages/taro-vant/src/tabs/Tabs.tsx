import { createSelectorQuery, nextTick } from '@tarojs/taro'
import {
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import toArray from 'rc-util/lib/Children/toArray'
import { ScrollView, View } from '@tarojs/components'
import {
  createNamespace,
  getAllRect,
  getRect,
  isDef,
  requestAnimationFrame,
  uuid,
  ZIndex,
} from '../utils'
import Sticky from '../sticky'
import type { TabProps, TabsProps } from './PropsType'
import * as computed from './wxs'
import clsx from 'clsx'
import { Badge } from '../badge'

const [ bem ] = createNamespace('tabs')
const [ tabBem ] = createNamespace('tab')

const MIN_DISTANCE = 10

function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }
  return ''
}

function parseTabList(children: React.ReactNode): any[] {
  return toArray(children).
    map((node: React.ReactElement<TabProps>) => {
      if (isValidElement(node)) {
        const key = node.key !== undefined ? String(node.key) : undefined
        return {
          key,
          ...node.props,
          node,
        }
      }

      return null
    }).
    filter((tab) => tab)
}

export function Tabs(props: TabsProps) {
  const ref = useRef({
    skipInit: false,
    direction: '',
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0,
    swiping: false,
  })
  const id = useMemo(() => uuid(16), [])
  const [ state, setState ]: any = useState({
    tabs: [],
    scrollLeft: 0,
    scrollable: false,
    currentIndex: 0,
    container: undefined,
    skipTransition: true,
    scrollWithAnimation: false,
    lineOffsetLeft: 0,
  })
  const {
    scrollLeft,
    scrollable,
    currentIndex,
    container,
    skipTransition,
    scrollWithAnimation,
    lineOffsetLeft,
  } = state

  const {
    swipeable,
    active = 0,
    lazyRender = true,
    type = 'line',
    sticky,
    zIndex = ZIndex.Tabs,
    offsetTop = 0,
    border,
    color,
    ellipsis = true,
    lineHeight = -1,
    duration = 0.3,
    lineWidth = 40,
    titleActiveColor,
    titleInactiveColor,
    swipeThreshold = 5,
    animated,
    onScroll,
    onClick,
    onChange,
    onDisabled,
    style,
    className,
    children,
    tabClass,
    tabActiveClass,
    ...others
  } = props

  const tabs = useMemo(() => {
    return parseTabList(children)
  }, [ children ])

  const newChildren = useMemo(() => {
    return tabs.map((tab, index) => {
      return cloneElement(tab.node, {
        key: index,
        active: currentIndex === index,
        lazyRender,
        animated,
        index,
      })
    }) as any[]
  }, [ animated, currentIndex, lazyRender, tabs ])

  const trigger = function (
    eventName: 'onClick' | 'onChange' | 'onDisabled',
    child?: any,
  ) {
    const currentChild = child || newChildren[currentIndex]
    if (!isDef(currentChild)) {
      return
    }
    const func = {
      onClick,
      onChange,
      onDisabled,
    }
    func[eventName]?.({
      detail: {
        index: currentChild.props.index,
        name: currentChild.props.name || currentChild.props.index,
        title: currentChild.props.title,
      },
    })
  }

  const getCurrentName = function () {
    const activeTab: any = newChildren[currentIndex]
    if (activeTab) {
      return activeTab.props.name || activeTab.props.index
    }
  }

  const resize = function (index?: number) {
    if (type !== 'line') {
      return
    }
    index = index ?? currentIndex
    Promise.all([
      getAllRect(null, `.van-tabs--${id} .van-tab`),
      getRect(null, `.van-tabs--${id} .van-tabs__line`),
    ]).then(([ rects = [], lineRect ]: any) => {
      if (rects && lineRect) {
        const rect = rects[index!]
        if (rect == null) {
          return
        }
        let lineOffsetLeft = rects.
          slice(0, index).
          reduce((prev: number, curr: any) => prev + curr.width, 0)
        lineOffsetLeft += (rect.width - lineRect.width) / 2 + (ellipsis ? 0 : 8)
        setState((pre: any) => {
          return { ...pre, lineOffsetLeft }
        })
        ref.current.swiping = true
        if (skipTransition) {
          nextTick(() => {
            setState((pre: any) => {
              return { ...pre, skipTransition: false }
            })
          })
        }
      }
    })
  }

  const scrollIntoView = function (index?: number) {
    if (!scrollable) {
      return
    }
    index = index ?? currentIndex
    Promise.all([
      getAllRect(null, `.van-tabs--${id} .van-tab`),
      getRect(null, `.van-tabs--${id} .van-tabs__nav`),
    ]).then(([ tabRects, navRect ]: any) => {
      if (tabRects && navRect) {
        const tabRect = tabRects[index!]
        const offsetLeft = tabRects.
          slice(0, index).
          reduce((prev: number, curr: any) => prev + curr.width, 0)
        setState((pre: any) => {
          return {
            ...pre,
            scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2,
          }
        })
        if (!scrollWithAnimation) {
          nextTick(() => {
            setState((pre: any) => {
              return {
                ...pre,
                scrollWithAnimation: true,
              }
            })
          })
        }
      }
    })
  }

  const setCurrentIndex = function (cIndex: number) {
    if (!isDef(cIndex) || cIndex >= newChildren.length || cIndex < 0) {
      return
    }

    if (cIndex === currentIndex) {
      return
    }
    const shouldEmitChange = currentIndex !== null
    setState((pre: any) => {
      return { ...pre, currentIndex: cIndex }
    })
    requestAnimationFrame(() => {
      resize(cIndex)
      scrollIntoView(cIndex)
    })
    nextTick(() => {
      if (shouldEmitChange) {
        trigger('onChange', newChildren[cIndex])
      }
    })
  }

  const setCurrentIndexByName = function (name: any) {
    const matched = newChildren.filter(
      (child: any) => (child.props.name || child.props.index) === name,
    )
    if (matched.length) {
      setCurrentIndex(matched[0]!.props.index)
    }
  }

  const onTap = function (event: any) {
    let { index } = event.currentTarget.dataset
    index = parseInt(index)
    const child = newChildren[index]
    if (child.props.disabled) {
      trigger('onDisabled', child)
    } else {
      setCurrentIndex(index)
      nextTick(() => {
        trigger('onClick', child)
      })
    }
  }

  const resetTouchStatus = function () {
    ref.current.direction = ''
    ref.current.deltaX = 0
    ref.current.deltaY = 0
    ref.current.offsetX = 0
    ref.current.offsetY = 0
  }
  const touchStart = function (event: any) {
    resetTouchStatus()
    const touch = event.touches[0]
    ref.current.startX = touch.clientX
    ref.current.startY = touch.clientY
  }
  const touchMove = function (event: any) {
    const touch = event.touches[0]
    ref.current.deltaX = touch.clientX - ref.current.startX
    ref.current.deltaY = touch.clientY - ref.current.startY
    ref.current.offsetX = Math.abs(ref.current.deltaX)
    ref.current.offsetY = Math.abs(ref.current.deltaY)
    ref.current.direction =
      ref.current.direction ||
      getDirection(ref.current.offsetX, ref.current.offsetY)
  }
  const getAvaiableTab = function (direction: number) {
    const step = direction > 0 ? -1 : 1
    for (
      let i = step;
      currentIndex + i < tabs.length && currentIndex + i >= 0;
      i += step
    ) {
      const index = currentIndex + i
      if (
        index >= 0 &&
        index < tabs.length &&
        tabs[index] &&
        !tabs[index].disabled
      ) {
        return index
      }
    }
    return -1
  }

  const onTouchStart = function (event: any) {
    if (!swipeable) return
    touchStart(event)
  }

  const onTouchMove = function (event: any) {
    if (!swipeable || !ref.current.swiping) return
    touchMove(event)
  }

  const onTouchEnd = function () {
    if (!swipeable || !ref.current.swiping) return
    const { direction, deltaX, offsetX } = ref.current
    const minSwipeDistance = 50
    if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
      const index = getAvaiableTab(deltaX)
      if (index !== -1) {
        setCurrentIndex(index)
      }
    }

    ref.current.swiping = false
  }

  useEffect(function () {
    ref.current.swiping = true
    setState((pre: any) => {
      return {
        ...pre,
        container: () =>
          createSelectorQuery().select(`.van-tabs--${id} .van-tabs`),
      }
    })
    setTimeout(() => {
      resize()
      scrollIntoView()
      if (active !== getCurrentName()) {
        setCurrentIndexByName(active)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    function () {
      resize()
      scrollIntoView()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ lineWidth ],
  )
  useEffect(
    function () {
      if (active !== getCurrentName()) {
        setCurrentIndexByName(active)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ active ],
  )

  useEffect(
    function () {
      setState((pre: any) => {
        return {
          ...pre,
          scrollable: newChildren.length > swipeThreshold || !ellipsis,
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ swipeThreshold ],
  )

  // 解决异步加载的时候默认的下划线不出现的问题
  useEffect(
    function () {
      nextTick(() => {
        resize()
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ newChildren ],
  )

  return (
    <View
      className={clsx(bem([ type, `${id}` ]), className)}
      style={style}
      {...others}
    >
      <Sticky
        disabled={!sticky}
        zIndex={zIndex}
        offsetTop={offsetTop}
        container={container}
        onScroll={onScroll}
      >
        <View
          className={clsx(
            bem('wrap', {
              scrollable,
            }),
            {
              'van-hairline--top-bottom': type === 'line' && border,
            },
          )}
        >
          <ScrollView
            scrollX={scrollable}
            scrollWithAnimation={scrollWithAnimation}
            scrollLeft={scrollLeft}
            className={clsx(bem('scroll', [ type ]))}
            style={color ? 'border-color: ' + color : ''}
          >
            <View
              className={clsx(
                bem('nav', [
                  type,
                  {
                    complete: !ellipsis,
                  },
                ]),
              )}
              style={computed.navStyle(color, type)}
            >
              {type === 'line' && (
                <View
                  className={clsx(bem('line'))}
                  style={computed.lineStyle({
                    color,
                    lineOffsetLeft,
                    lineHeight,
                    skipTransition,
                    duration,
                    lineWidth,
                  })}
                />
              )}
              {tabs.map((item: any, index: any) => {
                return (
                  <View
                    key={index}
                    data-index={index}
                    className={clsx(
                      tabBem({
                        active: index === currentIndex,
                        disabled: item.disabled,
                        complete: !ellipsis,
                      }),
                      computed.tabClass(
                        index === currentIndex,
                        ellipsis,
                        tabClass,
                        tabActiveClass,
                      ),
                    )}
                    style={computed.tabStyle({
                      active: index === currentIndex,
                      ellipsis,
                      color,
                      type,
                      disabled: item.disabled,
                      titleActiveColor,
                      titleInactiveColor,
                      swipeThreshold,
                      scrollable,
                    })}
                    onClick={onTap}
                  >
                    <View
                      className={clsx(
                        { 'van-ellipsis': ellipsis },
                        item.titleClass,
                      )}
                      style={item.titleStyle}
                    >
                      {item.title}
                      {(item.badge !== null || item.dot) && (
                        <Badge
                          content={item.badge}
                          dot={item.dot}
                          className={clsx(tabBem('title__badge'))}
                        />
                      )}
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </Sticky>
      <View
        className={clsx(bem('content'))}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <View
          className={clsx(bem('track', { animated }))}
          style={computed.trackStyle({
            duration,
            currentIndex,
            animated,
          })}
        >
          {newChildren}
        </View>
      </View>
    </View>
  )
}
Tabs.displayName = 'Tabs'
export default Tabs
