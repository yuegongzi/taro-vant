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
  title?: string
  color?: string
  visible?: boolean
  formatter?: (day: Day) => Day
  confirmText?: string
  rangePrompt?: string
  showRangePrompt?: boolean
  defaultDate?: string | string[]
  allowSameDay?: boolean
  confirmDisabledText?: string
  type?: CalendarType
  minDate?: number
  maxDate?: number
  position?: Position
  rowHeight?: number | string
  round?: boolean
  poppable?: boolean
  showMark?: boolean
  showTitle?: boolean
  showConfirm?: boolean
  showSubtitle?: boolean
  safeAreaInsetBottom?: boolean
  closeOnClickOverlay?: boolean
  maxRange?: number
  firstDayOfWeek?: Week
  onOpen?: () => void
  onClose?: () => void
  onOpened?: () => void
  onClosed?: () => void
  onConfirm?: (e: CalendarEvents) => void
  overRange?: () => void
  onUnselect?: (e: CalendarEventsSingle) => void
  onSelect?: (e: CalendarEvents) => void
  onClickSubtitle?: (a?: any) => void
  footer?: ReactNode
}
export type ICalendarInstance = {
  reset: (date?: Date | Date[]) => void
  // scrollToDate: (date: Date) => void
}
declare const Calendar: ComponentClass<CalendarProps>
export { Calendar }
