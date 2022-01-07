import { useCallback } from 'react'
import { nextTick } from '@tarojs/taro'

export function useFadeIn(ref: any) {
  return useCallback(
    function () {
      if (ref.current) {
        ref.current.style.cssText = 'display: block;opacity: 0'
      }
      nextTick(() => {
        if (ref.current) {
          ref.current.style.cssText =
            'transition: opacity .2s linear;opacity: 1;display: block;'
        }
      })
    },
    [ ref ],
  )
}
