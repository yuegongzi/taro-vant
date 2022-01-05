import { useRef, useState } from 'react'
import { useFadeIn } from './use-fade-in'
import { useFadeOut } from './use-fade-out'

export function useMask(ref: any) {
  const [ isShowMask, setIsShowMask ] = useState(false)
  const maskRef = useRef<HTMLDivElement>()
  const maskfadeOut = useFadeOut(maskRef)
  const maskfadeIn = useFadeIn(maskRef)
  const actionRef = useRef({
    show: function () {
      setIsShowMask(true)
      maskfadeIn()
    },
    hide: function () {
      setIsShowMask(false)
      maskfadeOut()
    },
  })
  ref.current = actionRef.current
  return { maskRef, isShowMask }
}
