import type { ComponentClass } from 'react'
import type { IPickerInstance, PickerProps } from '../picker/PropsType'

export interface AreaProps
  extends Omit<PickerProps, 'columns' | 'onChange'>,
    ComponentClass {
  value?: string
  areaList?: {
    province_list: Record<number | string, string>
    city_list: Record<number | string, string>
    county_list: Record<number | string, string>
  }
  columnsNum?: string | number
  columnsPlaceholder?: string[]
  onChange: (event: {
    detail: {
      values: number[] | string[]
      picker: IPickerInstance
      index: number
    }
  }) => void
}

declare const Area: ComponentClass<AreaProps>

export { Area }
