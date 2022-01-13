import { useCallback } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import type { SwitchProps } from './PropsType'
import Loading from '../loading/index'
import * as computed from './wxs'
import { assembly, computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('switch')

function Switch(props: SwitchProps) {
  const {
    checked = false,
    loading = false,
    disabled = false,
    activeColor,
    inactiveColor,
    size = '60',
    activeValue = true,
    inactiveValue = false,
    onChange,
    style,
    className,
    ...others
  } = props

  const onClick = useCallback(
    (event: ITouchEvent) => {
      if (disabled || loading) {
        return
      }
      const value = checked === activeValue ? inactiveValue : activeValue
      const ev = assembly(event, value)
      onChange?.(ev)
    },
    [ activeValue, checked, disabled, inactiveValue, loading, onChange ],
  )

  return (
    <View
      className={clsx(
        bem({
          on: checked === activeValue,
          disabled,
        }),
        className,
      )}
      style={computedStyle([
        computed.rootStyle({
          size,
          checked,
          activeColor,
          inactiveColor,
          activeValue,
        }),
        style,
      ])}
      {...others}
      onClick={onClick}
    >
      <View className={clsx(bem('node'))}>
        {loading && (
          <Loading
            color={computed.loadingColor({
              checked,
              activeColor,
              inactiveColor,
              activeValue,
            })}
            className={clsx(bem('loading'))}
          />
        )}
      </View>
    </View>
  )
}

Switch.displayName = 'Switch'
export default Switch
