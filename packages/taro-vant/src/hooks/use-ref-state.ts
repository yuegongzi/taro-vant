import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useCallback, useRef, useState } from 'react'
import { isFunction } from '../utils'

type StateType<T> = T | (() => T)

export function useRefState<T>(
  initialState: StateType<T>,
): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T>] {
  const [ state, setState ] = useState<T>(initialState)
  const ref = useRef(state)
  const setRafState = useCallback(
    (patch) => {
      setState((prevState) => {
        // eslint-disable-next-line no-return-assign
        return (ref.current = isFunction(patch) ? patch(prevState) : patch)
      })
    },
    [ state ],
  )
  return [ state, setRafState, ref ]
}
