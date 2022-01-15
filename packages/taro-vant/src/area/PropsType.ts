import type { ComponentClass } from 'react'
import type { IPickerInstance, PickerProps } from '../picker/PropsType'

export interface AreaProps
  extends Omit<PickerProps, 'columns' | 'onChange'>,
    ComponentClass {
  value?: string
  areaList?: AreaList
  columnsNum?: string | number
  columnsPlaceholder?: string[]
  onChange: (event: Event) => void
}

export type AreaList = {
  province_list: Record<number | string, string>
  city_list: Record<number | string, string>
  county_list: Record<number | string, string>
}
export type Event = {
  detail: {
    values: number[] | string[]
    picker: IPickerInstance
    index: number
  }
}
