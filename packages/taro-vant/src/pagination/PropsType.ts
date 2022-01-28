import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export type PageItem = {
  text: string | number
  number: number
  active?: boolean
}

export type PaginationMode = 'simple' | 'multi'

export interface PaginationProps extends StandardProps {
  /** 当前页码   */
  value?: number
  /** 显示模式 */
  mode?: PaginationMode
  /** 上一页按钮文字   */
  prevText?: ReactNode
  /** 下一页按钮文字   */
  nextText?: ReactNode
  pageDesc?: ReactNode
  /** 总页数   */
  pageCount?: number | string
  /** 总记录数   */
  totalItems?: number | string
  /** 每页记录数   */
  itemsPerPage?: number | string
  /** 显示的页码个数   */
  showPageSize?: number | string
  /** 是否显示省略号   */
  forceEllipses?: boolean
  /** 自定义页码   */
  pageRender?: ({ number, text, active }: PageItem) => ReactNode
  /** 页码改变时触发   */
  onChange?: (page: number) => void
}
