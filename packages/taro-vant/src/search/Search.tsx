import './style/index.less';
import { useState, useEffect, useMemo } from 'react'
import type { ITouchEvent } from '@tarojs/components';
import { View } from '@tarojs/components'
import Field from '../field'
import type { SearchProps } from './PropsType'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('search')

 function Search(props: SearchProps) {
  const {
    value,
    defaultValue = '',
    label,
    focus,
    error,
    disabled,
    readonly,
    inputAlign,
    showAction,
    leftIcon = 'search',
    rightIcon,
    placeholder,
    placeholderStyle,
    actionText = '取消',
    background = '#ffffff',
    maxlength = -1,
    shape = 'square',
    clearable = true,
    clearTrigger = 'focus',
    clearIcon = 'clear',
    renderLabel,
    renderLeftIcon,
    renderRightIcon,
    renderAction,
    onFocus,
    onBlur,
    onChange,
    onClear,
    onClickInput,
    onSearch,
    onCancel,
    style,
    className,
    ...others
  } = props

  const noControlled = useMemo(() => typeof value === 'undefined', [ value ])
  const [ innerValue, setInnerValue ] = useState(
    noControlled ? defaultValue : value,
  )
  const _change = function (event: ITouchEvent) {
    if (noControlled) {
      setInnerValue(event.detail)
    }
    onChange?.(event)
  }

  const _cancel = function (e: ITouchEvent) {
    /**
     * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
     * https://github.com/youzan/@vant/weapp/issues/1768
     */
    setTimeout(() => {
      setInnerValue('')

      onCancel?.()
      Object.defineProperty(e, 'detail', {
        value: '',
      })

      onChange?.(e)
    }, 200)
  }

  useEffect(
    function () {
      if (!noControlled) {
        setInnerValue(value)
      }
    },
    [ noControlled, value ],
  )

  const searchValue = noControlled ? innerValue : (value as number)

  return (
    <View
      className={clsx(bem( {
        withaction: showAction || !!renderAction,
      }),className)}
      style={computedStyle([ { background: background }, style ])}
      {...others}
    >
      <View className={clsx(bem('content', [ shape ]))}>
        {label ? (
          <View className={clsx(bem('label'))}>{label}</View>
        ) : (
          renderLabel
        )}

        <Field
          type='text'
          leftIcon={!renderLeftIcon ? leftIcon : ''}
          rightIcon={!renderRightIcon ? rightIcon : ''}
          focus={focus}
          error={error}
          border={false}
          confirmType='search'
          className={clsx(bem('field'))}
          value={searchValue}
          disabled={disabled}
          readonly={readonly}
          clearable={clearable}
          clearTrigger={clearTrigger}
          clearIcon={clearIcon}
          maxlength={maxlength}
          inputAlign={inputAlign}
          placeholder={placeholder}
          placeholder-style={placeholderStyle}
          renderLeftIcon={renderLeftIcon}
          renderRightIcon={renderRightIcon}
          style='padding: 5px 10px 5px 0; background-color: transparent;'
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={_change}
          onConfirm={onSearch}
          onClear={onClear}
          onClickInput={onClickInput}
        />
      </View>

      {(showAction || renderAction) && (
        <View
          className={clsx(bem('action'))}
          hoverClass={clsx(bem('action',[ 'hover' ],true))}
          hoverStayTime={70}
        >
          {renderAction || (
            <View onClick={_cancel}>
              {actionText}
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default Search
