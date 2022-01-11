import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import { useCallback, useContext, useEffect, useState } from 'react'
import type { RadioProps } from './PropsType'
import Icon from '../icon'
import RadioGroupContext from './context'
import { addUnit, createNamespace, isDef, isEmptyObject } from '../utils'
import * as computed from './wxs'
import clsx from 'clsx'

const [ bem ] = createNamespace('radio')

export function Radio(props: RadioProps) {
  const [ state, setState ] = useState({
    value: '',
    direction: '',
    parentDisabled: false,
  })

  const {
    name,
    disabled = false,
    checkedColor,
    labelPosition = 'right',
    labelDisabled = false,
    shape = 'round',
    iconSize = '20px',
    iconRender,
    style,
    className,
    children,
    ...others
  } = props

  const parentData = useContext(RadioGroupContext)

  const onChange = useCallback(
    (event) => {
      if (parentData.onChange) {
        parentData.onChange(event)
        return
      }

      props?.onChange?.(event)
    },
    // eslint-disable-next-line
    [parentData.onChange, props.onChange],
  )

  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        value: props.value,
      }
    })
  }, [ props.value ])

  useEffect(() => {
    if (!isEmptyObject(parentData)) {
      const { value, direction, disabled }: any = parentData

      setState((state) => {
        return {
          ...state,
          value,
          direction,
          parentDisabled: disabled,
        }
      })
    }
  }, [ props.value, parentData ])

  const emitChange = useCallback(
    (event: ITouchEvent) => {
      onChange?.(event)
      setState((state) => {
        return {
          ...state,
          value: event.detail,
        }
      })
    },
    [ onChange ],
  )
  const onClick = useCallback(
    (event: ITouchEvent) => {
      if (!disabled && !state.parentDisabled) {
        Object.defineProperty(event, 'detail', {
          value: name,
          writable: true,
        })
        emitChange(event)
      }
    },
    [ disabled, emitChange, name, state.parentDisabled ],
  )
  const onClickLabel = useCallback(
    (event: ITouchEvent) => {
      if (!(disabled || state.parentDisabled) && !labelDisabled) {
        Object.defineProperty(event, 'detail', {
          value: name,
          writable: true,
        })
        emitChange(event)
      }
    },
    [ disabled, emitChange, labelDisabled, name, state.parentDisabled ],
  )

  return (
    <View
      className={clsx(bem([ state.direction ]), className)}
      style={style}
      {...others}
    >
      {labelPosition === 'left' && (
        <View
          className={clsx(
            bem('label', [
              labelPosition,
              { disabled: disabled || state.parentDisabled },
            ]),
          )}
          onClick={onClickLabel}
        >
          {children}
        </View>
      )}
      <View
        className={clsx(bem('icon-wrap'))}
        style={'font-size: ' + addUnit(iconSize)}
        onClick={onClick}
      >
        {/*@ts-ignore*/}
        {isDef(iconRender) ? (
          iconRender({
            disabled: disabled || state.parentDisabled,
            checked: state.value === name,
          })
        ) : (
          <Icon
            name='success'
            className={clsx(
              bem('icon', [
                shape,
                {
                  disabled: disabled || state.parentDisabled,
                  checked: state.value === name,
                },
              ]),
            )}
            style={computed.iconStyle({
              iconSize,
              checkedColor,
              disabled,
              parentDisabled: state.parentDisabled,
              value: state.value,
              name,
            })}
          />
        )}
      </View>
      {labelPosition === 'right' && (
        <View
          className={clsx(
            bem('label', [
              labelPosition,
              {
                disabled: disabled || state.parentDisabled,
              },
            ]),
          )}
          onClick={onClickLabel}
        >
          {children}
        </View>
      )}
    </View>
  )
}
Radio.displayName = 'Radio'
export default Radio
