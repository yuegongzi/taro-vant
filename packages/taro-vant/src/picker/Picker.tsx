import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { View } from '@tarojs/components'
import type {
  IPickerInstance,
  PickerChangeEvents,
  PickerProps,
} from './PropsType'
import PickerColumn from './PickerColumn'
import Loading from '../loading'
import * as computed from './wxs'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('picker')
const Picker = forwardRef(function Index(
  props: PickerProps,
  ref: React.ForwardedRef<IPickerInstance>,
): JSX.Element {
  const {
    valueKey = 'text',
    toolbarPosition = 'top',
    defaultIndex,
    columns,
    title,
    cancelButtonText,
    confirmButtonText,
    itemHeight = 48, // 只支持px为单位的数字
    visibleItemCount = 5,
    loading,
    onChange,
    className,
    style,
    onCancel,
    onConfirm,
    showToolbar = true,
    ...others
  } = props

  const children = useRef<any[]>([])
  const handleIndex = useRef<number>(-1)

  const setColumnValue = function (index: any, value: any) {
    const column = children.current[index] || {}
    if (column == null) {
      return Promise.reject(new Error('setColumnValue: 对应列不存在'))
    }
    return column.setValue(value)
  }

  const setColumnValues = useCallback(function (index, options) {
    if (index <= handleIndex.current) return
    const column = children.current[index]
    if (column == null) {
      return Promise.reject(new Error('setColumnValues: 对应列不存在'))
    }
    const isSame =
      JSON.stringify(column.props.options) === JSON.stringify(options)
    if (isSame) {
      return Promise.resolve()
    }
    const cIndex = column.getCurrentIndex()
    return column.set({ options }).then(() => {
      if (cIndex > options.length) {
        setTimeout(() => {
          column.setIndex(0)
          handleIndex.current = -1
        })
      }
    })
  }, [])

  const getColumnValue = useCallback(function (index: number) {
    const column = children.current[index]
    return column && column.getValue()
  }, [])

  const getColumnIndex = useCallback(function (columnIndex: number) {
    return (children.current[columnIndex] || {}).getCurrentIndex()
  }, [])

  const setColumns = useCallback(
    function () {
      const simple = columns && columns.length && !columns[0].values
      const columns_ = simple ? [ { values: columns } ] : columns
      const stack = (columns_ || []).map((column, index) =>
        setColumnValues(index, column.values),
      )
      return Promise.all(stack)
    },
    [ columns ],
  )
  useEffect(
    function () {
      if (Array.isArray(children) && children.length) {
        setColumns().catch(() => {})
      }
    },
    [ columns, children ],
  )

  const getValues = useCallback(function () {
    return children.current.map((child) => child.getValue())
  }, [])

  const getIndexes = useCallback(function () {
    return children.current.map((child) => child.getCurrentIndex())
  }, [])

  const onTouchMove = useCallback(function () {}, [])

  const setColumnIndex = useCallback(function (index, optionIndex) {
    const column = children.current[index]
    if (column == null) {
      return Promise.reject(new Error('setColumnIndex: 对应列不存在'))
    }
    return column.setIndex(optionIndex)
  }, [])

  const setValues = function (values: any) {
    const stack = values.map((value: any, index: number) =>
      setColumnValue(index, value),
    )
    return Promise.all(stack)
  }

  const emit = function (event: any) {
    const type = event?.currentTarget?.dataset.type
    const simple = columns && columns.length && !columns[0].values
    if (typeof event === 'number' || !type) {
      if (onChange) {
        const event_ = {}
        handleIndex.current = event
        Object.defineProperties(event_, {
          detail: {
            value: {
              picker: {
                setColumnValue,
                getColumnValue,
                setColumnValues,
                getColumnValues: (index: number) =>
                  children.current[index].options,
                getIndexes,
                setIndexes: (indexes: number[]) => {
                  const stack = indexes.map((optionIndex, columnIndex) =>
                    setColumnIndex(columnIndex, optionIndex),
                  )
                  return Promise.all(stack)
                },
                setColumnIndex,
                getColumnIndex,
                getValues,
                setColumns,
                children,
                setValues,
                columns,
              },
              value: simple ? getColumnValue(0) : getValues(),
              index: simple ? getColumnIndex(0) : event,
            },
          },
        })
        onChange(event_ as PickerChangeEvents)
      }
    } else if (type === 'cancel') {
      if (onCancel) {
        Object.defineProperty(event, 'detail', {
          value: {
            value: simple ? getColumnValue(0) : getValues(),
            index: simple ? getColumnIndex(0) : getIndexes(),
          },
        })
        onCancel(event)
      }
    } else if (type === 'confirm') {
      if (onConfirm) {
        Object.defineProperty(event, 'detail', {
          value: {
            value: simple ? getColumnValue(0) : getValues(),
            index: simple ? getColumnIndex(0) : getIndexes(),
          },
        })
        onConfirm(event)
      }
    }
  }
  const onChange_ = emit

  useImperativeHandle(ref, () => {
    return {
      setColumnValue,
      getColumnValue,
      setColumnValues,
      getColumnValues: (index: number) => children.current[index].options,
      getIndexes,
      setIndexes: (indexes: number[]) => {
        const stack = indexes.map((optionIndex, columnIndex) =>
          setColumnIndex(columnIndex, optionIndex),
        )
        return Promise.all(stack)
      },
      setColumnIndex,
      getColumnIndex,
      getValues,
      setColumns,
      children,
      setValues,
      columns,
    } as any
  })

  const onTouchMove_ = useCallback(function (event) {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  return (
    <View
      className={clsx(bem(), className)}
      style={computedStyle([ style ])}
      {...others}
      onTouchMove={onTouchMove_}
    >
      {toolbarPosition === 'top' && showToolbar && (
        <View className={clsx(bem('toolbar'))}>
          <View
            className={clsx(bem('cancel'))}
            hoverClass={clsx(bem('cancel', [ 'hover' ], true))}
            hoverStayTime={70}
            data-type='cancel'
            onClick={emit}
          >
            {cancelButtonText || '取消'}
          </View>
          {title && (
            <View className={clsx(bem('title'), 'van-ellipsis')}>{title}</View>
          )}
          <View
            className={clsx(bem('confirm'))}
            hoverClass={clsx(bem('confirm', [ 'hover' ], true))}
            hoverStayTime={70}
            data-type='confirm'
            onClick={emit}
          >
            {confirmButtonText || '确定'}
          </View>
        </View>
      )}
      {loading && (
        <View className={clsx(bem('loading'))}>
          <Loading />
        </View>
      )}
      <View
        className={clsx(bem('columns'))}
        style={computed.columnsStyle({
          itemHeight,
          visibleItemCount,
        })}
        onTouchMove={onTouchMove}
      >
        {computed.columns(columns).map((item: any, index: number) => {
          return (
            <PickerColumn
              className={clsx(bem('column'))}
              key={`van-picker__column_${index}column-class`}
              data-index={index}
              index={index}
              valueKey={valueKey}
              initialOptions={item.values}
              defaultIndex={item.defaultIndex || defaultIndex}
              itemHeight={itemHeight}
              visibleItemCount={visibleItemCount}
              onChange={onChange_}
              ref={(el) => (children.current[index] = el)}
            />
          )
        })}
        <View
          className={clsx(bem('mask'))}
          style={computed.maskStyle({
            itemHeight,
            visibleItemCount,
          })}
        />
        <View
          className={clsx(bem('frame'), 'van-hairline--top-bottom')}
          style={computed.frameStyle({
            itemHeight,
          })}
        />
      </View>
      {toolbarPosition === 'bottom' && showToolbar && (
        <View className={clsx(bem('toolbar'))}>
          <View
            className={clsx(bem('cancel'))}
            hoverClass={clsx(bem('cancel', [ 'hover' ], true))}
            hoverStayTime={70}
            data-type='cancel'
            onClick={emit}
          >
            {cancelButtonText}
          </View>
          {title && (
            <View className={clsx(bem('title'), 'van-ellipsis')}>{title}</View>
          )}
          <View
            className={clsx(bem('confirm'))}
            hoverClass={clsx(bem('confirm', [ 'hover' ], true))}
            hoverStayTime={70}
            data-type='confirm'
            onClick={emit}
          >
            {confirmButtonText}
          </View>
        </View>
      )}
    </View>
  )
})
Picker.displayName = 'Picker'
export default Picker
