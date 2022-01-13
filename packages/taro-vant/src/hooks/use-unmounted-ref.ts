import { useRef, useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUnmountedRef = () => {
  const unmountedRef = useRef(false)
  useEffect(() => {
    unmountedRef.current = false

    return () => {
      unmountedRef.current = true
    }
  }, [])
  return unmountedRef
}
