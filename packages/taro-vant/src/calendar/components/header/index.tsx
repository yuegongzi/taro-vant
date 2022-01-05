import { View } from '@tarojs/components'
import React, { useState, useCallback, useEffect } from 'react'
import { createNamespace } from '../../../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('calendar')
type ICalendarHeaderProps = {
  title?: string | React.ReactNode
  subtitle?: string | React.ReactNode
  showTitle?: boolean
  showSubtitle?: boolean
  firstDayOfWeek?: number
  renderTitle?: React.ReactNode
  onClickSubtitle?: (a: any) => void
}

export default function Index(props: ICalendarHeaderProps) {
  const {
    title = '日期选择',
    showTitle,
    subtitle,
    showSubtitle,
    firstDayOfWeek,
    renderTitle,
    onClickSubtitle,
  } = props

  const [ weekdays, setWeekDays ] = useState<any[]>([])

  const initWeekDay = useCallback(
    function () {
      const defaultWeeks = [ '日', '一', '二', '三', '四', '五', '六' ]
      const firstDayOfWeek_ = firstDayOfWeek || 0
      setWeekDays([
        ...defaultWeeks.slice(firstDayOfWeek_, 7),
        ...defaultWeeks.slice(0, firstDayOfWeek_),
      ])
    },
    [ firstDayOfWeek ],
  )

  useEffect(
    function () {
      initWeekDay()
    },
    [ initWeekDay ],
  )

  return (
    <View className={clsx(bem('header'))}>
      {showTitle && (
        <View>
          {renderTitle && (
            <View className={clsx(bem('header-title'))}>{renderTitle}</View>
          )}
          <View className={clsx(bem('header-title'))}>{title}</View>
        </View>
      )}
      {showSubtitle && (
        <View
          className={clsx(bem('header-subtitle'))}
          onClick={onClickSubtitle}
        >
          {subtitle}
        </View>
      )}
      <View className={clsx(bem('weekdays'))}>
        {weekdays.map((item: any) => {
          return (
            <View key={item.index} className={clsx(bem('weekday'))}>
              {item}
            </View>
          )
        })}
      </View>
    </View>
  )
}
