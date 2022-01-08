import type { ComponentClass, ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

type CalendarSelectType = 'selected' | 'start' | 'middle' | 'end' | 'disabled'

type CalendarType = 'single' | 'multiple' | 'range'

interface CalendarEvents extends ITouchEvent {
  detail: {
    value: Date | Date[]
  }
}

interface CalendarEventsSingle extends ITouchEvent {
  detail: {
    value: Date
  }
}

type Day = {
  date: CalendarSelectType
  type?: string
  text?: string | number
  bottomInfo?: string
  className?: string
  topInfo?: string
}

type Position = 'left' | 'right' | 'bottom' | 'top'
type Week = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface CalendarProps extends StandardProps {
  /**
   * @description  日历标题
   * @default `日期选择`
   */
  title?: string
  /**
   * @description 主题色，对底部按钮和选中日期生效
   * @default <font color='#ee0a24'>#ee0a24</font>
   */
  color?: string
  /**
   * @description 是否显示
   */
  show?: boolean
  /**
   * @description 日期格式化函数
   * @param day
   */
  formatter?: (day: Day) => Day
  /**
   * @description 确认按钮的文字
   * @default `确定`
   */
  confirmText?: string
  /**
   * @description 范围选择超过最多可选天数时的提示文案
   * @default `选择天数<br/>不能超过 xx 天`
   */
  rangePrompt?: string
  /**
   * @description 范围选择超过最多可选天数时，是否展示提示文案
   * @default `true`
   */
  showRangePrompt?: boolean
  /**
   * @description 默认选中的日期，type为`multiple`<br/>或`range`时为数组
   * @default
   */
  defaultDate?: string | string[]
  /**
   * @description 是否允许日期范围的起止时间为同一天
   * @default `false`
   */
  allowSameDay?: boolean
  /**
   * @description 确认按钮处于禁用状态时的文字
   * @default `确定`
   */
  confirmDisabledText?: string
  /**
   * @description 选择类型<br/> `single`表示选择单个日期，<br/> `multiple` 选择多个日期<br/> `range`表示选择日期区间
   */
  type?: CalendarType
  /**
   * @description 可选择的最小日期
   * @default `当前日期`
   */
  minDate?: number
  /**
   * @description  可选择的最大日期
   * @default `当前日期<br/>的六个月后`
   */
  maxDate?: number
  /**
   * @description 弹出位置，可选值为 `top` `right` `left`
   * @default `bottom`
   */
  position?: Position
  /**
   * @description  日期行高
   * @default `64`
   */
  rowHeight?: number | string
  /**
   * @description 是否显示圆角弹窗
   * @default`true`
   */
  round?: boolean
  /**
   * @description 是否以弹层的形式展示日历
   * @default `true`
   */
  poppable?: boolean
  /**
   * @description 是否显示月份背景水印
   * @default `true`
   */
  showMark?: boolean
  /**
   * @description  是否展示日历标题
   * @default `true`
   */
  showTitle?: boolean
  /**
   * @description 是否展示确认按钮
   * @default  `true`
   */
  showConfirm?: boolean
  /**
   * @description 是否展示日历副标题（年月）
   * @default `true`
   */
  showSubtitle?: boolean
  /**
   * @description 是否开启底部安全区适配
   * @default `true`
   */
  safeAreaInsetBottom?: boolean
  /**
   * @description 是否在点击遮罩层后关闭
   * @default `true`
   */
  closeOnClickOverlay?: boolean
  /**
   * @description 日期区间最多可选天数，默认无限制
   * @default
   */
  maxRange?: number
  /**
   * @description 设置周起始日 `0~6`
   * @default `0`
   */
  firstDayOfWeek?: Week
  /**
   * @description 打开弹出层时触发
   * @default
   */
  onOpen?: () => void
  /**
   * @description 关闭弹出层时触发
   * @default
   */
  onClose?: () => void
  /**
   * @description 打开弹出层且动画结束后触发
   * @default
   */
  onOpened?: () => void
  /**
   * @description 关闭弹出层且动画结束后触发
   * @default
   */
  onClosed?: () => void
  /**
   * @description 日期选择完成后触发，若`showConfirm`为true，则点击确认按钮后触发
   * @default
   */
  onConfirm?: (e: CalendarEvents) => void
  /**
   * @description 范围选择超过最多可选天数时触发
   * @default
   */
  overRange?: () => void
  /**
   * @description 当 Calendar的type<br/>为 `multiple`时,<br/>点击已选中的日期时触发
   * @default
   */
  onUnselect?: (e: CalendarEventsSingle) => void
  /**
   * @description 点击任意日期时触发
   * @default
   */
  onSelect?: (e: CalendarEvents) => void
  /**
   * @description 点击日历副标题时触发
   * @default
   */
  onClickSubtitle?: (a?: any) => void
  /**
   * @description 自定义标题
   * @default
   */
  renderTitle?: ReactNode
  /**
   * @description 自定义底部
   * @default
   */
  renderFooter?: ReactNode
}

export type ICalendarInstance = {
  reset: (date?: Date | Date[]) => void
  // scrollToDate: (date: Date) => void
}

declare const Calendar: ComponentClass<CalendarProps>

export { Calendar }
