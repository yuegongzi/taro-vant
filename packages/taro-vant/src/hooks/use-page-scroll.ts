import { useEffect } from 'react'
import { usePageScroll as useTaroPageScroll } from '@tarojs/taro'
import { ENV } from '../utils'

export function usePageScroll(scroller: any) {
  useEffect((): any => {
    // 兼容react-ui 弄出来的代码
    if (!ENV.h5) return
    const el = document as any

    function listener(event: Event): void {
      if (!event.target) return
      const _event = {
        scrollTop: el.scrollingElement.scrollTop,
        scrollLeft: el.scrollingElement.scrollLeft,
      }

      scroller(_event)
    }

    el.addEventListener('scroll', listener)
    return () => {
      el.removeEventListener('scroll', listener)
    }
  })
  useTaroPageScroll((e) => {
    if (ENV.h5) return
    scroller(e)
  })
}
