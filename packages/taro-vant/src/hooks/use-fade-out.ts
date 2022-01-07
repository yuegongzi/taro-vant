import { useCallback } from 'react'

export function useFadeOut(ref: any) {
  return useCallback(
    function() {
      if (ref.current) {
        ref.current.style.cssText =
          'transition: opacity .2s linear;opacity: 0;display: block;'
      }
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.cssText = 'display: none;opacity: 0;'
        }
      }, 200)
    },
    [ ref ],
  )
}
