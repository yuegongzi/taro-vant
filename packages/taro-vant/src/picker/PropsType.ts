import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface PickerProps extends StandardProps {
  valueKey?: string
  toolbarPosition?: string
  defaultIndex?: number
  columns?: any[]
  title?: string
  cancelButtonText?: string
  confirmButtonText?: string
  loading?: boolean
  itemHeight?: string | number
  visibleItemCount?: number
  onChange?: (e: PickerChangeEvents) => void
  onCancel?: (e: PickerEvents) => void
  onConfirm?: (e: PickerEvents) => void
  showToolbar?: boolean
}
export interface PickerEvents extends ITouchEvent {
  detail: {
    value: number | number[]
    index: number | number[]
  }
}
export interface PickerChangeEvents extends ITouchEvent {
  detail: {
    value: number | number[]
    picker: IPickerInstance
    index: number
  }
}
export type IPickerInstance = {
  setColumnValues: (index: number, options: string[]) => Promise<any>
  getColumnValues: (index: number[]) => (number | string)[]
  setColumnValue: (index: number, value: number | string) => any
  getColumnValue: (index: number) => number | string
  columns: any[]
  getIndexes: () => number[]
  setIndexes: () => void
  getValues: () => number | string
  confirm: () => void
}

export interface PickerColumnProps extends StandardProps {
  valueKey?: string
  className?: string
  itemHeight?: number | string
  visibleItemCount?: number
  initialOptions?: any[]
  defaultIndex?: number
  onChange?: (a: any) => void
  activeClass?: string
  refBase?: any
}
