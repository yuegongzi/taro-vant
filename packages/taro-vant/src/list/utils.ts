import { ENV } from '../utils'
import type { ITouchEvent } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { createSelectorQuery } from '@tarojs/taro'

export type ScrollElement = Element | Window

export const sleep = (t: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, t)
  })

function selectorQuery(nodesRef?: TaroElement) {
  if (!nodesRef || nodesRef.nodeName === 'root') {
    return createSelectorQuery().selectViewport()
  } else {
    return createSelectorQuery().select('#' + nodesRef.uid)
  }
}

export function scrollOffset(nodesRef: TaroElement) {
  return new Promise<{
    scrollLeft: number // 节点的水平滚动位置
    scrollTop: number // 节点的竖直滚动位置
  }>((resolve) => {
    // 没有固定高度-- 就去拿page的高度
    if (ENV.h5) {
      const _nodesRef: any =
        nodesRef || document.documentElement || document.body
      return resolve({
        scrollLeft: _nodesRef.scrollLeft,
        scrollTop: _nodesRef.scrollTop,
      })
    }
    return selectorQuery(nodesRef).
      scrollOffset().
      exec(async (res) => {
        if (res[0] == null) {
          await sleep(300)
          resolve(scrollOffset(nodesRef))
        } else {
          resolve(res[0])
        }
      })
  })
}

export function boundingClientRect(nodesRef: TaroElement) {
  return new Promise<{
    /** 节点的下边界坐标 */
    bottom: number
    height: number
    /** 节点的 ID */
    id: string
    /** 节点的左边界坐标 */
    left: number
    /** 节点的右边界坐标 */
    right: number
    /** 节点的上边界坐标 */
    top: number
    /** 节点的宽度 */
    width: number
  }>((resolve) => {
    if (ENV.h5) {
      const _nodesRef: any =
        nodesRef || document.documentElement || document.body
      return resolve(_nodesRef.getBoundingClientRect())
    }
    return selectorQuery(nodesRef).
      boundingClientRect().
      exec((res) => {
        resolve(res[0])
      })
  })
}

export const stopPropagation = (event: ITouchEvent) => event.stopPropagation()

export function preventDefault(
  event: ITouchEvent,
  isStopPropagation?: boolean,
) {
  /* istanbul ignore else */
  // if (typeof event?.cancelable !== 'boolean' || event?.cancelable) {
  // }
  event.preventDefault()

  if (isStopPropagation) {
    stopPropagation(event)
  }
}
