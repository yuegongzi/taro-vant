import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import { useCallback } from 'react'
import { createNamespace, GRAY_DARK, GREEN } from '../utils'
import Icon from '../icon'
import type { StepsProps } from './PropsType'
import clsx from 'clsx'

const [ bem ] = createNamespace('steps')
const [ stepBem ] = createNamespace('step')

function getStatus(index: number, active: any) {
  if (index < active) {
    return 'finish'
  } else if (index === active) {
    return 'process'
  }

  return 'inactive'
}

function Steps(props: StepsProps) {
  const {
    steps = [],
    active = 0,
    direction = 'horizontal',
    activeColor = GREEN,
    inactiveColor = GRAY_DARK,
    activeIcon = 'checked',
    inactiveIcon,
    className,
    onClickStep,
    ...others
  } = props

  const _onClick = useCallback(
    (event: ITouchEvent) => {
      const { index } = event.currentTarget.dataset
      Object.defineProperty(event, 'detail', {
        value: index,
      })
      onClickStep?.(event)
    },
    [ onClickStep ],
  )
  return (
    <View className={clsx(bem([ direction ]), className)} {...others}>
      <View className={clsx(bem('wrapper'))}>
        {steps.map((item, index) => {
          return (
            <View
              key={index}
              onClick={_onClick}
              data-index={index}
              className={clsx(
                stepBem([ direction, `${getStatus(index, active)}` ]),
                'van-hairline',
              )}
              style={
                getStatus(index, active) === 'inactive'
                  ? 'color: ' + inactiveColor
                  : ''
              }
            >
              <View
                className={clsx(stepBem('title'))}
                style={index === active ? 'color: ' + activeColor : ''}
              >
                <View>{item.text}</View>
                <View>{item.desc}</View>
              </View>
              <View className={clsx(stepBem('circle-container'))}>
                {index !== active ? (
                  <>
                    {item.inactiveIcon || inactiveIcon ? (
                      <Icon
                        color={
                          getStatus(index, active) === 'inactive'
                            ? inactiveColor
                            : activeColor
                        }
                        name={item.inactiveIcon || inactiveIcon || ''}
                        className={clsx(stepBem('icon'))}
                      />
                    ) : (
                      <View
                        className={clsx(stepBem('circle'))}
                        style={
                          'background-color: ' +
                          (active !== undefined && index < active
                            ? activeColor
                            : inactiveColor)
                        }
                      />
                    )}
                  </>
                ) : (
                  <Icon
                    name={item.activeIcon || activeIcon}
                    color={activeColor}
                    className={clsx(stepBem('icon'))}
                  />
                )}
              </View>
              {index !== steps.length - 1 && (
                <View
                  className={clsx(stepBem('line'))}
                  style={
                    'background-color: ' +
                    (active !== undefined && index < active
                      ? activeColor
                      : inactiveColor)
                  }
                />
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}
Steps.displayName = 'Steps'
export default Steps
