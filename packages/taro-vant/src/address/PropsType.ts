import type { ITouchEvent, StandardProps } from '@tarojs/components'
import type { CSSProperties } from 'react'

export type AddressData = {
  /**
   * id
   */
  id?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 姓名
   */
  recipient?: string
  /**
   * 省
   */
  province?: string
  /**
   * 城市
   */
  city?: string
  /**
   * 区域
   */
  district?: string
  /**
   * 详细地址
   */
  address?: string
  /**
   * 是否默认地址
   */
  defaults?: boolean
}

export interface AddressProps {
  className?: string
  /** 组件的内联样式, 可以动态设置的内联样式 */
  style?: string | CSSProperties
  /**
   * 地址数据
   */
  data: AddressData
  /**
   * 可选
   * @default false
   */
  checked?: boolean
  /**
   * 编辑
   * clickable 失效
   * @default true
   */
  edit?: boolean

  /**
   * 点击反馈
   * @default false
   */
  clickable?: boolean
  /**
   * 点击事件
   */
  onClick?: (e: ITouchEvent) => void
  /**
   * 编辑事件
   */
  onEdit?: (e: ITouchEvent) => void
  /**
   * 颜色
   * @default #1890ff
   */
  color?: string
}

export interface AddressListProps extends StandardProps {
  /**
   * 数据列表
   */
  list: AddressData[]

  /**
   * 选中的地址id
   */
  value?: string
  /**
   * 选项变化时回调
   * @param val
   */
  onChange?: (e: ITouchEvent) => void
}
