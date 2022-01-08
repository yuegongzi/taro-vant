import type { ComponentClass, ReactNode } from 'react'
import type { ButtonProps, ITouchEvent, StandardProps } from '@tarojs/components'
import type { PopupProps } from '../popup'


/**
 * @title Props
 * @description 动作面板
 */
export interface ActionSheetProps extends StandardProps, PopupProps {
  /**
   * @description 操作列
   * @default `[]`
   */
  actions?: ActionSheetItem[]
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 是否显示动作面板
   */
  show?: boolean
  /**
   * @description 取消按钮文字
   */
  cancelText?: string
  /**
   * @description 选项上方的描述信息
   */
  description?: string
  /**
   * @description 是否显示遮罩层
   */
  overlay?: boolean
  /**
   * @description 点击遮罩是否关闭菜单
   */
  closeOnClickOverlay?: boolean
  /**
   * @description 是否在点击选项后关闭
   * @default `true`
   */
  closeOnClickAction?: boolean
  /**
   * @description 是否为 iPhoneX 留出底部安全距离
   * @default `true`
   */
  safeAreaInsetBottom?: boolean
  /**
   * @description 是否显示圆角
   * @default `true`
   */
  round?: boolean
  /**
   * @description z-index 层级
   * @default `100`
   */
  zIndex?: number
  /**
   * @description 子节点
   */
  children?: ReactNode
  /**
   * @description 选中选项时触发，禁用或加载状态下不会触发
   * @param event 选项对应的对象
   */
  onSelect?: (event: ITouchEvent & { detail: ActionSheetItem }) => void
  /**
   * @description 取消按钮点击时触发
   */
  onCancel?: () => void
  /**
   * @description 关闭时触发
   */
  onClose?: () => void
  /**
   * @description 点击遮罩层时触发
   */
  onClickOverlay?: () => void
}
export interface ActionSheetItem extends Omit<ButtonProps, 'children'> {
  /**
   * @description 标题
   */
  name?: string
  /**
   * @description 二级标题
   */
  subname?: string
  /**
   * @description 选项文字颜色
   */
  color?: string
  /**
   * @description 是否为加载状态
   */
  loading?: boolean
  /**
   * @description 是否为禁用状态
   */
  disabled?: boolean
}

declare const ActionSheet: ComponentClass<ActionSheetProps>
export { ActionSheet }

