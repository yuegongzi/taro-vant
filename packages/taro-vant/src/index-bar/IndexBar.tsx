import type { ITouch, ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { nextTick, pageScrollTo } from '@tarojs/taro'
import toArray from 'rc-util/lib/Children/toArray'
import {
  computedStyle,
  createNamespace,
  getAllRect,
  getRect,
  isDef,
  ZIndex,
} from '../utils'
import { usePageScroll } from '../hooks'
import type { IndexBarProps } from './PropsType'
import clsx from 'clsx'

const [ bem ] = createNamespace('index-bar')

const genIndexList = () => {
  const indexList = []
  const charCodeOfA = 'A'.charCodeAt(0)
  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }
  return indexList
}

function parseIndexAnchor(children: React.ReactNode): any[] {
  return toArray(children).
    map(
      (node: React.ReactElement<{ index: number | string }>, index: number) => {
        if (isValidElement(node)) {
          const key = node.key !== undefined ? String(node.key) : index
          return {
            key,
            ...node.props,
            node,
          }
        }

        return null
      },
    ).
    filter((indexAnchor) => !!indexAnchor)
}

function IndexBar(props: IndexBarProps) {
  const {
    sticky = true,
    zIndex = ZIndex.Indexbar,
    highlightColor,
    stickyOffsetTop = 0,
    indexList = genIndexList(),
    onSelect,
    children,
    className,
    style,
  } = props

  const [ activeAnchorIndex, setActiveAnchorIndex ] = useState<any>(null)
  const [ showSidebar, setShowSidebar ] = useState(true)
  const [ changeData, setChangeData ] = useState<any>([])
  const timerRef = useRef<any>(null)
  const scrollTopRef = useRef<number>(0)
  const sidebarRef = useRef<any>(null)
  const scrollToAnchorIndexRef = useRef<any>(null)
  const rectRef = useRef<any>({})

  const realAnchor = useRef<
    { top: number; height: number; childIndex: number; index: number }[]
  >([])
  const _children = useMemo(() => {
    let anchorIndex = 0
    return parseIndexAnchor(children).map((anchor: any, index: number) => {
      // index  可能没有  他会用到children
      if (anchor.node?.type?.displayName === 'IndexAnchor') {
        realAnchor.current[anchorIndex] = {
          ...(realAnchor.current[anchorIndex] ?? { top: 0, height: 0 }),
          childIndex: index,
          index: anchor.node?.props?.index,
        }
        anchorIndex += 1
      }
      const data = changeData[index]
      const defaultProps = {
        key: index,
      }
      const props = data
        ? {
            ...defaultProps,
            ...data,
          }
        : defaultProps
      return cloneElement(anchor.node, props)
    })
  }, [ changeData, children ])

  // 应该在 子组件中调用
  const _setAnchorsRect = useCallback(() => {
    return getAllRect(null, '.van-index-anchor__wrapper').then((rects: any) => {
      realAnchor.current = rects.map(
        (
          e: {
            top: number
            height: number
          },
          index: number,
        ) => ({
          ...(realAnchor.current[index] ?? {}),
          top: e.top,
          height: e.height,
        }),
      )
    })
  }, [])
  const _scrollIntoView = useCallback(
    (top) => {
      pageScrollTo({
        duration: 0,
        scrollTop: top + stickyOffsetTop, // + scrollTopRef.current,
      })
    },
    [ stickyOffsetTop ],
  )

  const _setListRect = useCallback(() => {
    return getRect(null, '.van-index-bar').then((rect: any) => {
      if (!isDef(rect)) {
        return
      }
      rectRef.current = {
        height: rect.height,
        top: rect.top + scrollTopRef.current,
      }
    })
  }, [])

  const _setSiderbarRect = useCallback(() => {
    return getRect(null, '.van-index-bar__sidebar').then((res: any) => {
      if (!isDef(res)) {
        return
      }
      sidebarRef.current = {
        height: res.height,
        top: res.top,
      }
    })
  }, [])
  const _getActiveAnchorIndex = useCallback(() => {
    const child = realAnchor.current
    for (let i = child.length - 1; i >= 0; i--) {
      const rect = child[i]
      if (!rect) continue
      const preAnchorHeight = i > 0 ? child[i - 1]?.height : 0
      const reachTop = sticky
        ? (preAnchorHeight as number) + stickyOffsetTop
        : 0
      if (reachTop + scrollTopRef.current >= rect.top) {
        return i
      }
    }
    return -1
  }, [ sticky, stickyOffsetTop ])

  const _setRect = useCallback(() => {
    return Promise.all([ _setAnchorsRect(), _setListRect(), _setSiderbarRect() ])
  }, [ _setAnchorsRect, _setListRect, _setSiderbarRect ])

  const _onScroll = useCallback(() => {
    if (!_children?.length) {
      return
    }
    const child = realAnchor.current
    const active = _getActiveAnchorIndex()
    setActiveAnchorIndex(active)

    const updateStyle: any[] = []
    if (sticky) {
      let isActiveAnchorSticky = false
      if (active !== -1) {
        isActiveAnchorSticky =
          (child[active]?.top || 0) <= stickyOffsetTop + scrollTopRef.current
      }

      realAnchor.current.forEach((item, index) => {
        if (index === active) {
          let wrapperStyle = ''
          let anchorStyle = `
          color: ${highlightColor};
        `
          if (isActiveAnchorSticky) {
            wrapperStyle = `
            height: ${item.height}px;
          `
            anchorStyle = `
            position: fixed;
            top: ${stickyOffsetTop}px;
            z-index: ${zIndex};
            color: ${highlightColor};
          `
          }
          updateStyle[item.childIndex] = {
            active: true,
            anchorStyle,
            wrapperStyle,
          }
        } else if (index === active - 1) {
          // const _children = _getChildren(children)
          const currentAnchor = item
          // 自己距离顶部 的位置
          const currentOffsetTop = currentAnchor?.top || 0
          const targetOffsetTop =
            index === _children.length - 1
              ? rectRef.current.top
              : realAnchor.current[index + 1]?.top
          const parentOffsetHeight = targetOffsetTop - currentOffsetTop
          const translateY = parentOffsetHeight - (currentAnchor?.height || 0)
          const anchorStyle = `
          position: relative;
          transform: translate3d(0, ${translateY}px, 0);
          z-index: ${zIndex};
          color: ${highlightColor};
        `
          updateStyle[item.childIndex] = {
            active: true,
            anchorStyle,
          }
        } else {
          updateStyle[item.childIndex] = {
            active: false,
            anchorStyle: '',
            wrapperStyle: '',
          }
        }
      })
      setChangeData(updateStyle)
    }
  }, [
    _children.length,
    _getActiveAnchorIndex,
    highlightColor,
    sticky,
    stickyOffsetTop,
    zIndex,
  ])
  const scroller = useCallback(
    (event) => {
      scrollTopRef.current =
        (event === null || event === void 0 ? void 0 : event.scrollTop) || 0
      _onScroll()
    },
    [ _onScroll ],
  )

  usePageScroll(scroller)

  const _scrollToAnchor = useCallback(
    (index) => {
      if (
        typeof index !== 'number' ||
        scrollToAnchorIndexRef.current === index
      ) {
        return
      }

      scrollToAnchorIndexRef.current = index

      const currentItem = realAnchor.current.find(
        (item) => item?.index === indexList[index],
      )
      if (currentItem) {
        // 可以--
        _scrollIntoView(currentItem.top)
        onSelect?.({ detail: currentItem.index })
      }
    },
    [ _scrollIntoView, indexList, onSelect ],
  )

  const _onClick = useCallback(
    (event) => {
      _scrollToAnchor(Number(event.target.dataset.index))
    },
    [ _scrollToAnchor ],
  )

  const _onTouchMove = useCallback(
    (event: ITouchEvent) => {
      event.stopPropagation()
      event.preventDefault()
      const sidebarLength = realAnchor.current.length || 0
      const touch = event.touches[0] as ITouch
      const itemHeight = sidebarRef.current.height / sidebarLength
      let index = Math.floor(
        (touch.clientY - sidebarRef.current.top) / itemHeight,
      )
      if (index < 0) {
        index = 0
      } else if (index > sidebarLength - 1) {
        index = sidebarLength - 1
      }
      _scrollToAnchor(index)
    },
    [ _scrollToAnchor ],
  )

  const _onTouchStop = useCallback(() => {
    scrollToAnchorIndexRef.current = null
  }, [])

  const _updateData = useCallback(() => {
    nextTick(() => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        setShowSidebar(!!realAnchor.current.length)
        _setRect().then(() => {
          _onScroll()
        })
      }, 100)
    })
  }, [ _onScroll, _setRect ])

  useEffect(() => {
    _updateData()
  }, [ _updateData ])

  return (
    <View className={clsx(bem(), className)} style={computedStyle([ style ])}>
      {_children}
      {showSidebar && (
        <View
          className={clsx(bem('sidebar'))}
          onClick={_onClick}
          onTouchMove={_onTouchMove}
          onTouchEnd={_onTouchStop}
          onTouchCancel={_onTouchStop}
        >
          {indexList.map((item, index) => {
            return (
              <View
                key={index}
                className={clsx(
                  bem('index', {
                    active: activeAnchorIndex === index,
                  }),
                )}
                style={
                  'z-index: ' +
                  (zIndex + 1) +
                  '; color: ' +
                  (activeAnchorIndex === index ? highlightColor : '')
                }
                data-index={index}
              >
                {item}
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

IndexBar.displayName = 'IndexBar'
export default IndexBar
