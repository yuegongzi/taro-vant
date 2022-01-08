import type { ComponentClass } from 'react'
import type { IPickerInstance, PickerProps } from '../picker/PropsType'

/**
 * @title 省市区
 * @description 省市区选择 其他属性参见`PickerProps`
 */
export interface AreaProps extends Omit<PickerProps, 'columns' | 'onChange'>, ComponentClass {
  /**
   * @description 当前选中的省市区`code`
   */
  value?: string
  /**
   * @description 省市区数据，格式见下方
   */
  areaList?: AreaList
  /**
   * @description 省市区显示列数，3-省市区，2-省市，1-省
   * @default `3`
   */
  columnsNum?: string | number
  /**
   * @description 列占位提示文字
   * @default `[]`
   */
  columnsPlaceholder?: string[]
  /**
   * @description 选项改变时触发
   * @param event
   */
  onChange: (event: Event) => void
}

export type AreaList  ={
  /**
   * @description 省份数据
   */
  province_list: Record<number | string, string>
  /**
   * @description 城市数据
   */
  city_list: Record<number | string, string>
  /**
   * @description 区域数据
   */
  county_list: Record<number | string, string>
}

export type Event = {
  detail: {
    values: number[] | string[]
    picker: IPickerInstance
    index: number
  }
}

declare const Area: ComponentClass<AreaProps>

export { Area }
