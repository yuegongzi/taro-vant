import { View } from '@tarojs/components'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { createNamespace } from '../../../utils'
import clsx from 'clsx'
import { compareDay, getMonthEndDay, getNextDay, getPrevDay } from '../../utils'
import { formatMonthTitle, getDayStyle, getMark, getMonthStyle } from './wxs'

const [ bem ] = createNamespace('calendar')

type ICalendarMonthProps = {
  date?: string
  type?: string
  color?: string
  minDate?: number
  maxDate?: number
  showMark?: boolean
  rowHeight?: number | string
  currentDate?: string
  firstDayOfWeek?: number
  allowSameDay?: boolean
  showSubtitle?: boolean
  showMonthTitle?: boolean
  onClick?: (a: any) => void
  formatter?: (a: any) => any
  id?: string
  className?: string
}

function Index(props: ICalendarMonthProps, ref: React.ForwardedRef<any>) {
  const {
    date,
    rowHeight,
    showMonthTitle,
    showMark,
    color,
    type,
    firstDayOfWeek,
    currentDate,
    onClick,
    minDate,
    maxDate,
    allowSameDay,
    formatter,
    className,
    id,
  } = props

  const [ visible, setVisible ] = useState<boolean>(true)
  const [ days, setDays_ ] = useState<any[]>([])

  const onClick_ = useCallback(
    function (event: any) {
      const { index } = event.currentTarget.dataset
      const item = days[index]
      if (item.type !== 'disabled') {
        if (onClick) onClick(item)
      }
    },
    [ days, onClick ],
  )

  const getMultipleDayType = useCallback(
    function (day) {
      if (!Array.isArray(currentDate)) {
        return ''
      }
      const isSelected = (date: any) =>
        currentDate.some((item) => compareDay(item, date) === 0)
      if (isSelected(day)) {
        const prevDay = getPrevDay(day)
        const nextDay = getNextDay(day)
        const prevSelected = isSelected(prevDay)
        const nextSelected = isSelected(nextDay)
        if (prevSelected && nextSelected) {
          return 'multiple-middle'
        }
        if (prevSelected) {
          return 'end'
        }
        return nextSelected ? 'start' : 'multiple-selected'
      }
      return ''
    },
    [ currentDate ],
  )

  const getRangeDayType = useCallback(
    function (day) {
      if (!Array.isArray(currentDate)) {
        return ''
      }
      const [ startDay, endDay ] = currentDate
      if (!startDay) {
        return ''
      }
      const compareToStart = compareDay(day, startDay)
      if (!endDay) {
        return compareToStart === 0 ? 'start' : ''
      }
      const compareToEnd = compareDay(day, endDay)
      if (compareToStart === 0 && compareToEnd === 0 && allowSameDay) {
        return 'start-end'
      }
      if (compareToStart === 0) {
        return 'start'
      }
      if (compareToEnd === 0) {
        return 'end'
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return 'middle'
      }
      return ''
    },
    [ allowSameDay, currentDate ],
  )

  const getDayType = useCallback(
    function (day) {
      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return 'disabled'
      }
      if (type === 'single') {
        return compareDay(day, currentDate) === 0 ? 'selected' : ''
      }
      if (type === 'multiple') {
        return getMultipleDayType(day)
      }
      /* istanbul ignore else */
      if (type === 'range') {
        return getRangeDayType(day)
      }
      return ''
    },
    [ currentDate, getMultipleDayType, getRangeDayType, maxDate, minDate, type ],
  )

  const getBottomInfo = useCallback(
    function (type_): any {
      if (type === 'range') {
        if (type_ === 'start') {
          return '开始'
        }
        if (type_ === 'end') {
          return '结束'
        }
        if (type_ === 'start-end') {
          return '开始/结束'
        }
      }
    },
    [ type ],
  )

  const setDays = useCallback(
    function () {
      const days = []
      const startDate = new Date(date || 0)
      const year = startDate.getFullYear()
      const month = startDate.getMonth()
      const totalDay = getMonthEndDay(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
      )
      for (let day = 1; day <= totalDay; day++) {
        const date = new Date(year, month, day)
        const type = getDayType(date)
        let config = {
          date,
          type,
          text: day,
          bottomInfo: getBottomInfo(type),
        }
        if (formatter) {
          config = formatter(config)
        }
        days.push(config)
      }
      setDays_(days)
    },
    [ date, formatter, getBottomInfo, getDayType ],
  )

  useEffect(
    function () {
      setDays()
    },
    [ setDays ],
  )

  useImperativeHandle(ref, function () {
    return {
      setVisible,
      visible,
    }
  })

  return (
    <View
      id={id}
      className={clsx(bem('month'), className)}
      style={getMonthStyle(visible, date, rowHeight ? Number(rowHeight) : 0)}
    >
      {showMonthTitle && (
        <View className={clsx(bem('month-title'))}>
          {formatMonthTitle(date)}
        </View>
      )}
      {visible && (
        <View className={clsx(bem('days'))}>
          {showMark && (
            <View className={clsx(bem('month-mark'))}>{getMark(date)}</View>
          )}
          {days.map((item: any, index: number) => {
            return (
              <View
                key={index}
                style={getDayStyle(
                  item.type,
                  index,
                  date,
                  rowHeight,
                  color,
                  firstDayOfWeek,
                )}
                className={clsx(bem('day', [ item.type ]), item.className)}
                data-index={index}
                onClick={onClick_}
              >
                {item.type === 'selected' ||
                currentDate === item.date.getTime() ? (
                  <View
                    className={clsx(bem('selected-day'))}
                    style={{ background: color }}
                  >
                    {item.topInfo && (
                      <View className={clsx(bem('top-info'))}>
                        {item.topInfo}
                      </View>
                    )}
                    {item.text}
                    {item.bottomInfo && (
                      <View className={clsx(bem('bottom-info'))}>
                        {item.bottomInfo}
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    {item.topInfo && (
                      <View className={clsx(bem('top-info'))}>
                        {item.topInfo}
                      </View>
                    )}
                    {item.text}
                    {item.bottomInfo && (
                      <View className={clsx(bem('bottom-info'))}>
                        {item.bottomInfo}
                      </View>
                    )}
                  </View>
                )}
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

export default forwardRef(Index)
