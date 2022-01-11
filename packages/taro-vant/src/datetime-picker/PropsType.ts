import type { ComponentClass } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'
import type { PickerProps } from '../picker'

export interface DatetimePickerProps
  extends DefinedExculdeNoMatch<
      PickerProps,
      'onInput' | 'onConfirm' | 'onChange'
    >,
    StandardProps {
  value?: string | number
  filter?: (type: string, values: (string | number)[]) => (number | string)[]
  type?: 'datetime' | 'date' | 'year-month' | 'time'
  showToolbar?: boolean
  formatter?: (type: string, value: string | number) => number | string
  minDate?: number | string
  maxDate?: number | string
  minHour?: number | string
  maxHour?: number | string
  minMinute?: number | string
  maxMinute?: number | string
  onInput?: (e: DatetimePickerEventsByValue) => void
  onChange?: (e: DatetimePickerEventsByInstance) => void
  onConfirm?: (e: DatetimePickerEventsByValue) => void
  onCancel?: () => void
}

export interface DatetimePickerEventsByValue extends ITouchEvent {
  detail: {
    value?: string | number
  }
}
export type DatetimePickerEventsByInstance = {
  detail: {
    datetimePicker: {
      columns: (string | number)[]
      setColumns: (columns: (string | number)[]) => (string | number)[]
      innerValue: Date
      updateColumnValue: (value: string) => Promise<string>
    }
  }
}
type DefinedExculdeNoMatch<TObject, T> = {
  [K in keyof TObject]: K extends T ? unknown : TObject[K]
}
declare const DatetimePicker: ComponentClass<DatetimePickerProps>
export { DatetimePicker }
