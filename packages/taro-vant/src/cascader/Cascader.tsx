/* eslint-disable no-plusplus */
import React, { isValidElement, useEffect, useState } from 'react'
import cls from 'clsx'
import type { CascaderOption, CascaderProps, CascaderTab } from './PropsType'
import { useSetState, useUpdateEffect } from '../hooks'
import Icon from '../icon'
import Tabs from '../tabs'
import { createNamespace } from '../utils'
import type { eventDetail } from '../tabs/PropsType'
import { View, Text as TaroText } from '@tarojs/components'

const extend = Object.assign
const [ bem ] = createNamespace('cascader')
const INITIAL_STATE = {
  tabs: [],
  activeTab: 0,
}

const Cascader: React.FC<CascaderProps> = (props) => {
  const [ internalValue, updateInternalValue ] = useState(undefined)
  const [ state, updateState ] =
    useSetState<{ tabs: CascaderTab[]; activeTab: number }>(INITIAL_STATE)

  const {
    text: textKey,
    value: valueKey,
    children: childrenKey,
  } = extend(
    {
      text: 'text',
      value: 'value',
      children: 'children',
    },
    props.fieldNames,
  )

  const getSelectedOptionsByValue = (
    options: CascaderOption[],
    value: string | number,
  ): CascaderOption[] | undefined => {
    for (let i = 0; i < options.length; i++) {
      const option = options[i]
      if (option?.[valueKey] === value) {
        return [ option ]
      }
      if (option?.[childrenKey]) {
        const selectedOptions = getSelectedOptionsByValue(
          option[childrenKey],
          value,
        )
        if (selectedOptions) {
          return [ option, ...selectedOptions ]
        }
      }
    }
    return undefined
  }

  const updateTabs = () => {
    if (internalValue || internalValue === 0) {
      const selectedOptions = getSelectedOptionsByValue(
        props.options,
        internalValue,
      )

      if (selectedOptions) {
        let optionsCursor = props.options

        const tabs = selectedOptions.map((option) => {
          const tab = {
            options: optionsCursor,
            selectedOption: option,
          }

          const next = optionsCursor.find(
            (item) => item[valueKey] === option[valueKey],
          )
          if (next) {
            optionsCursor = next[childrenKey]
          }

          return tab
        })

        if (optionsCursor) {
          // @ts-ignore
          tabs.push({ options: optionsCursor, selectedOption: null })
        }

        updateState({ tabs })
        setTimeout(() => {
          updateState({ activeTab: tabs.length - 1 })
        }, 0)

        return
      }
    }

    updateState({
      tabs: [
        {
          options: props.options,
          selectedOption: null,
        },
      ],
    })
  }

  const onSelect = (option: CascaderOption, tabIndex: number) => {
    if (option.disabled) {
      return
    }
    let tabs = JSON.parse(JSON.stringify(state.tabs))

    tabs[tabIndex].selectedOption = option

    if (tabs.length > tabIndex + 1) {
      tabs = tabs.slice(0, tabIndex + 1)
    }

    if (option[childrenKey]) {
      const nextTab = {
        options: option[childrenKey],
        selectedOption: null,
      }

      if (tabs[tabIndex + 1]) {
        tabs[tabIndex + 1] = nextTab
      } else {
        tabs.push(nextTab)
      }
      updateState({ tabs, activeTab: state.activeTab + 1 })
    }

    const selectedOptions = tabs.
      map((tab: any) => tab.selectedOption).
      filter(Boolean)

    const eventParams = {
      value: option[valueKey],
      tabIndex,
      selectedOptions,
    }

    updateInternalValue(option[valueKey])
    props.onChange?.(eventParams)

    if (!option[childrenKey]) {
      props.onFinish?.(eventParams)
    }
  }

  const onClose = () => props.onClose?.()

  const onClickTab = (event: eventDetail) => {
    const { name = '', title = '' } = event.detail
    updateState({ activeTab: +name })
    props.onClickTab?.(+name, title)
  }

  const getStateFromValue = (value?: (number | string)[]) => {
    if (!value || !value.length) return INITIAL_STATE
    try {
      const initialState = {
        activeTab: value.length - 1,
        tabs: [],
      } as typeof state
      value.reduce((options, v) => {
        const selectedOption = options.find((tabs) => tabs[valueKey] === v)
        if (!selectedOption)
          throw Error(
            'Cascader: unable to match options correctly, Please check value or defaultValue props.',
          )
        initialState.tabs.push({ options, selectedOption })
        return selectedOption[childrenKey]
      }, props.options)
      return initialState
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return INITIAL_STATE
    }
  }

  const renderCloseIcon = () => {
    if (!props.closeable) return null
    if (typeof props.closeIcon === 'string') {
      return (
        <Icon
          name={props.closeIcon}
          className={cls(bem('close-icon'))}
          onClick={onClose}
        />
      )
    }
    if (isValidElement(props.closeIcon)) {
      return props.closeIcon
    }
    return null
  }

  const renderHeader = () => (
    <View className={cls(bem('header'))}>
      <View className={cls(bem('title'))}>{props.title}</View>
      {renderCloseIcon()}
    </View>
  )

  const renderOption = (
    option: CascaderOption,
    selectedOption: CascaderOption | null,
    tabIndex: number,
  ) => {
    const selected = !!(
      selectedOption && option[valueKey] === selectedOption[valueKey]
    )
    const color = option.color || (selected ? props.activeColor : undefined)

    const Text = props.optionRender ? (
      props.optionRender({ option, selected })
    ) : (
      <TaroText>{option[textKey]}</TaroText>
    )
    return (
      <View
        key={option[valueKey]}
        className={cls(
          bem('option', {
            selected,
            disabled: option.disabled,
          }),
          option.className,
        )}
        style={{ color }}
        onClick={() => onSelect(option, tabIndex)}
      >
        {Text}
        {selected ? (
          <Icon name='success' className={cls(bem('selected-icon'))} />
        ) : null}
      </View>
    )
  }

  const renderOptions = (
    options: CascaderOption[],
    selectedOption: CascaderOption | null,
    tabIndex: number,
  ) => (
    <View key={tabIndex} className={cls(bem('options'))}>
      {options.map((option) => renderOption(option, selectedOption, tabIndex))}
    </View>
  )

  const renderTab = (tab: CascaderTab, tabIndex: number) => {
    const { options, selectedOption } = tab
    const title = selectedOption
      ? selectedOption[textKey]
      : props.placeholder || '请选择'
    return (
      <Tabs.Tab
        key={tabIndex}
        title={title}
        titleClass={cls(
          bem('tab', {
            unselected: !selectedOption,
          }),
        )}
      >
        {renderOptions(options, selectedOption, tabIndex)}
      </Tabs.Tab>
    )
  }

  const renderTabs = () => (
    <Tabs
      animated
      active={state.activeTab}
      className={cls(bem('tabs'))}
      color={props.activeColor}
      swipeThreshold={0}
      swipeable={props.swipeable}
      onClick={onClickTab}
    >
      {state.tabs.map(renderTab)}
    </Tabs>
  )

  useEffect(() => {
    updateTabs()
  }, [ JSON.stringify(props.options) ])

  useEffect(() => {
    const value = props.value
    if (!value || (Array.isArray(value) && !value.length)) return
    const initialState = getStateFromValue(value)
    updateState(initialState)
  }, [])

  useUpdateEffect(() => {
    const initialState = getStateFromValue(props.value)
    updateState(initialState)
  }, [ props.value ])

  useUpdateEffect(() => {
    if (internalValue || internalValue === 0) {
      const values = state.tabs.map((tab) => tab.selectedOption?.[valueKey])
      if (values.includes(internalValue)) {
        return
      }
    }
    updateTabs()
  }, [ internalValue ])

  return (
    <View className={cls(bem())}>
      {renderHeader()}
      {state.tabs.length ? renderTabs() : null}
    </View>
  )
}

Cascader.defaultProps = {
  closeable: true,
  swipeable: true,
  options: [],
  closeIcon: 'cross',
}

export default Cascader
