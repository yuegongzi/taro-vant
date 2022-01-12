import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface ContactCardProps extends StandardProps {
  /**
   * 姓名
   */
  name?: string
  /**
   * 电话
   */
  tel?: string
  /**
   * 类型 可选`edit`
   * @default `add`
   */
  type?: string
  /**
   * 添加时的文案提示
   */
  addText?: string
  /**
   * 不可编辑
   */
  disabled?: boolean
}

export interface ContactProps extends StandardProps {
  /**
   * 数据
   */
  data?: Record<string, any>
  /**
   * 电话字段
   * @default `phone`
   */
  telField?: string
  /**
   * 名字字段
   * @default `name`
   */
  nameField?: string

  /**
   * 编辑事件
   * @param val
   */
  onEdit?: (e: ITouchEvent) => void
}
