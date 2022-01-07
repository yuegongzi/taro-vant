import './style/index.less'
import { useCallback, useContext, useEffect, useState } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import Icon from '../icon'
import type { CheckboxProps } from './PropsType'
import CheckboxGroupContext from './context'
import { createNamespace, isEmptyObject } from '../utils'
import clsx from 'clsx'
import { iconStyle } from './wxs'

const [ bem ] = createNamespace('checkbox')

export function Checkbox(
  props: CheckboxProps & {
    parent: any
  },
) {
  const [ state, setState ] = useState({
    value: undefined,
    parentDisabled: false,
    direction: 'vertical',
  })

  const {
    name,
    disabled,
    checkedColor = '#1989fa',
    labelPosition = 'right',
    labelDisabled,
    shape = 'round',
    iconSize = '20px',
    renderIcon,
    style,
    className,
    children,
    ...others
  } = props

  const parentData = useContext(CheckboxGroupContext)

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
      const value: any = props.value
      return {
        ...state,
        value,
      }
    })
  }, [ props.value ])

  useEffect(() => {
    if (!isEmptyObject(parentData)) {
      const {
        value: parentValue,
        direction,
        disabled: parentDisabled,
      }: any = parentData

      const value: any = parentValue?.indexOf(`${props.name}`) > -1

      setState((state) => {
        return {
          ...state,
          value,
          direction,
          parentDisabled,
        }
      })
    }
  }, [ props, parentData ])

  const setParentValue = useCallback(
    (parent: any, event: ITouchEvent) => {
      const value = event.detail
      const { max, value: parentValue } = parent
      if (value) {
        if (max && parentValue.length >= max) {
          return
        }
        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name)
          event.detail = parentValue
          onChange?.(event)
        }
      } else {
        const index = parentValue.indexOf(name)
        if (index !== -1) {
          parentValue.splice(index, 1)
          event.detail = parentValue
          onChange?.(event)
        }
      }
    },
    [ name, onChange ],
  )
  const emitChange = useCallback(
    (event: ITouchEvent) => {
      if (!isEmptyObject(parentData)) {
        setParentValue(parentData, event)
      } else {
        onChange?.(event)
      }
    },
    [ parentData, onChange, setParentValue ],
  )
  const toggle = useCallback(
    (event: ITouchEvent) => {
      if (!disabled && !state.parentDisabled) {
        Object.defineProperty(event, 'detail', {
          value: !state.value,
          writable: true,
        })
        emitChange(event)
      }
    },
    [ disabled, emitChange, state.parentDisabled, state.value ],
  )
  const onClickLabel = useCallback(
    (event: ITouchEvent) => {
      if (!disabled && !labelDisabled && !state.parentDisabled) {
        Object.defineProperty(event, 'detail', {
          value: !state.value,
          writable: true,
        })
        emitChange(event)
      }
    },
    [ disabled, emitChange, labelDisabled, state.parentDisabled, state.value ],
  )

  return (
    <View
      className={clsx(bem({
        horizontal: state.direction === 'horizontal',
      }), className)}
      style={style}
      {...others}
    >
      {labelPosition === 'left' && (
        <View
          className={clsx(bem('label', [
            labelPosition, { disabled: disabled || state.parentDisabled },
          ]))}
          onClick={onClickLabel}
        >
          {children}
        </View>
      )}
      <View className={clsx(bem('icon-wrap'))} onClick={toggle}>
        {renderIcon || (
          <Icon
            name='success'
            className={clsx(bem('icon', [
              shape,
              {
                disabled: disabled || state.parentDisabled,
                checked: state.value,
              },
            ]))}
            style={
              iconStyle({
                checkedColor,
                value: state.value,
                disabled,
                parentDisabled: state.parentDisabled,
                iconSize,
              }) + ';line-height:1.25em;'
            }
          />
        )}
      </View>
      {labelPosition === 'right' && (
        <View
          className={clsx(bem('label'), [
            labelPosition,
            {
              disabled: disabled || state.parentDisabled,
            },
          ])}
          onClick={onClickLabel}
        >
          {children}
        </View>
      )}
    </View>
  )
}
Checkbox.displayName='Checkbox'
export default Checkbox
