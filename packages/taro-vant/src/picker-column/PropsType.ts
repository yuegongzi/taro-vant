import type { ComponentClass } from 'react'
import type { StandardProps } from '@tarojs/components'

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

declare const PickerColumn: ComponentClass<PickerColumnProps>

export { PickerColumn }
