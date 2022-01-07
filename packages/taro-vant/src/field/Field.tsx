import './style/index.less'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import { Block, Input, Textarea, View } from '@tarojs/components'
import type { FieldProps } from './PropsType'
import Cell from '../cell'
import Icon from '../icon'
import { assembly, createNamespace, resizeTextarea } from '../utils'
import clsx from 'clsx'
import { inputStyle } from './wxs'

let FIELD_INDEX = 0

const [ bem ] = createNamespace('field')

function Field(props: FieldProps) {
  const ref: React.MutableRefObject<{
    focused: boolean
  }> = useRef({
    focused: false,
  })
  const [ state, setState ] = useState({
    innerValue: '',
    showClear: false,
    unitag: 'van-field',
  })
  const { innerValue, showClear } = state
  const {
    size,
    leftIcon,
    center,
    border = true,
    isLink,
    required,
    clickable,
    titleWidth = '6.2em',
    style,
    arrowDirection,
    label,
    disabled,
    type = 'text',
    inputAlign,
    clearIcon = 'clear',
    rightIcon,
    icon,
    iconClass,
    value,
    maxlength = -1,
    showWordLimit,
    errorMessageAlign,
    error,
    errorMessage,
    fixed,
    focus,
    cursor = -1,
    autoFocus,
    readonly,
    placeholder,
    placeholderStyle,
    autosize,
    cursorSpacing = 50,
    adjustPosition = true,
    showConfirmBar = true,
    holdKeyboard,
    selectionEnd = -1,
    selectionStart = -1,
    alwaysEmbed,
    disableDefaultPadding = true,
    confirmType,
    confirmHold,
    password,
    clearable,
    clearTrigger = 'focus',
    renderLeftIcon,
    renderTitle,
    renderInput,
    renderRightIcon,
    renderIcon,
    renderButton,
    onChange,
    onFocus,
    onBlur,
    onClear,
    onConfirm,
    onInput,
    onClickInput,
    onClickIcon,
    onLineChange,
    onKeyboardHeightChange,
  } = props
  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        unitag: `van-field_uni_${FIELD_INDEX++}`,
      }
    })
  }, [])

  const adjustTextareaSize = () => {
    // const input = inputRef.value
    const taroTextarea: any = document.querySelector(`.${state.unitag}`)
    const textarea = taroTextarea?.children?.[0]

    if (type === 'textarea' && autosize && textarea) {
      resizeTextarea(textarea, autosize)
    }
  }

  const emitChange = function(event?: any) {
    event = event || { detail: { value: '' } }
    setState((pre: any) => {
      return { ...pre, innerValue: event.detail }
    })
    const ev = assembly(event, event.detail.value)
    onInput?.(ev)
    onChange?.(ev)
  }

  const setShowClear = function(value: any) {
    let showClear = false
    if (clearable && !readonly) {
      const hasValue = !!value
      const trigger =
        clearTrigger === 'always' ||
        (clearTrigger === 'focus' && ref.current.focused)
      showClear = hasValue && trigger
    }
    setState((pre: any) => {
      return { ...pre, showClear }
    })
  }

  const _input = function(event: any) {
    const value = event.detail.value || ''
    setShowClear(value)
    emitChange(event)
  }
  const _focus = function(event: any) {
    ref.current.focused = true
    setTimeout(() => {
      setShowClear(innerValue)
    }, 32)
    Object.defineProperty(event, 'detail', {
      value: event.detail.value,
    })
    onFocus?.(event)
  }
  const _blur = function(event: any) {
    ref.current.focused = false
    setShowClear(innerValue)
    Object.defineProperty(event, 'detail', {
      value: event.detail.value,
    })
    onBlur?.(event)
  }
  const _clear = function() {
    setState((pre: any) => {
      return { ...pre, innerValue: '' }
    })
    setShowClear('')
    Taro.nextTick(() => {
      emitChange()
      onClear?.()
    })
  }
  const _confirm = function(event: any) {
    const { value = '' } = event.detail || {}
    setShowClear(value)
    Object.defineProperty(event, 'detail', {
      value: event.detail.value,
    })
    onConfirm?.(event)
  }
  // setValue(value) {
  //   this.value = value
  //   this.setShowClear()
  //   if (value === '') {
  //     this.setData({ innerValue: '' })
  //   }
  //   this.emitChange()
  // },

  useEffect(
    function() {
      setShowClear(innerValue)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ readonly, clearable ],
  )

  useEffect(
    function() {
      setState((pre: any) => {
        return { ...pre, innerValue: value }
      })
    },
    [ value ],
  )

  useEffect(() => {
    if (process.env.TARO_ENV === 'h5') {
      adjustTextareaSize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ innerValue ])

  return (
    <Cell
      size={size}
      icon={leftIcon}
      center={center}
      border={border}
      isLink={isLink}
      required={required}
      clickable={clickable}
      titleWidth={titleWidth}
      titleStyle='margin-right: 12px;'
      style={style}
      arrowDirection={arrowDirection}
      className='van-field'
      renderIcon={<Block>{renderLeftIcon}</Block>}
      renderTitle={
        <Block>
          {label ? (
            <View className={clsx(bem('label', { disabled }))}>
              {label}
            </View>
          ) : (
            renderTitle
          )}
        </Block>
      }
    >
      <View className={clsx(bem('body', [ type ]))}>
        <View
          className={clsx(bem('control', [ inputAlign, 'custom' ]))}
          onClick={onClickInput}
        >
          {renderInput}
        </View>
        {type === 'textarea' ? (
          <Textarea
            className={clsx(bem('control', [
              inputAlign,
              type,
              {
                disabled,
                error,
              },
            ]), {
              ['autosize']: autosize,
            }, state.unitag)}
            fixed={fixed}
            focus={focus}
            cursor={cursor}
            value={innerValue}
            autoFocus={autoFocus}
            disabled={disabled || readonly}
            maxlength={maxlength}
            placeholder={placeholder}
            placeholderStyle={placeholderStyle}
            placeholderClass={clsx(bem('placeholder', {
              error,
              disabled,
            }))}
            // eslint-disable-next-line
            // @ts-ignore
            nativeProps={autosize ? { rows: 1 } : {}}
            autoHeight={!!autosize}
            style={inputStyle(autosize)}
            cursorSpacing={cursorSpacing}
            adjustPosition={adjustPosition}
            showConfirmBar={showConfirmBar}
            holdKeyboard={holdKeyboard}
            selectionEnd={selectionEnd}
            selectionStart={selectionStart}
            disableDefaultPadding={disableDefaultPadding}
            onInput={_input}
            onClick={onClickInput}
            onBlur={_blur}
            onFocus={_focus}
            onConfirm={_confirm}
            onLineChange={onLineChange}
            onKeyboardHeightChange={onKeyboardHeightChange}
          />
        ) : (
          <Input
            className={clsx(bem('control', [
              inputAlign,
              {
                disabled,
                error,
              },
            ]))
            }
            // eslint-disable-next-line
            // @ts-ignore
            type={type}
            focus={focus}
            cursor={cursor}
            value={innerValue}
            autoFocus={autoFocus}
            disabled={disabled || readonly}
            maxlength={maxlength}
            placeholder={placeholder}
            placeholderStyle={placeholderStyle}
            placeholderClass={clsx(bem('placeholder', {
              error,
            }))}
            confirmType={confirmType}
            confirmHold={confirmHold}
            holdKeyboard={holdKeyboard}
            cursorSpacing={cursorSpacing}
            adjustPosition={adjustPosition}
            selectionEnd={selectionEnd}
            selectionStart={selectionStart}
            alwaysEmbed={alwaysEmbed}
            password={password || type === 'password'}
            onInput={_input}
            onClick={onClickInput}
            onBlur={_blur}
            onFocus={_focus}
            onConfirm={_confirm}
            onKeyboardHeightChange={onKeyboardHeightChange}
          />
        )}
        {showClear && (
          <Icon
            name={clearIcon}
            className={clsx(bem('clear-root'), bem('icon-root'))}
            onTouchStart={_clear}
          />
        )}
        <View className={clsx(bem('icon-container'))} onClick={onClickIcon}>
          {(rightIcon || icon) && (
            <Icon
              name={(rightIcon || icon)!}
              className={clsx(bem('icon-root'), iconClass)}
            />
          )}
          {renderRightIcon}
          {renderIcon}
        </View>
        <View className={clsx(bem('button'))}>{renderButton}</View>
      </View>
      {showWordLimit && maxlength && (
        <View className={clsx(bem('word-limit'))}>
          <View
            className={clsx(bem('word-num', {
              full: innerValue.length >= maxlength,
            }))}
          >
            {innerValue.length >= maxlength ? maxlength : innerValue.length}
          </View>
          {'/' + maxlength}
        </View>
      )}
      {errorMessage && (
        <View
          className={clsx(bem('error-message', [
            errorMessageAlign,
            {
              disabled,
              error,
            },
          ]))}
        >
          {errorMessage}
        </View>
      )}
    </Cell>
  )
}


export default Field
